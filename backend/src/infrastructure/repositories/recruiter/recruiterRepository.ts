import Recruiter from '../../../domain/entities/recruiter/recruiter.entity';
import { SaveRecruiter } from '../../../domain/interfaces/recruiter/createRecruiterRequest';
import IRecruiterRepo from '../../../domain/interfaces/recruiter/IRecruiterRepo';
import { Db, ObjectId } from 'mongodb';
import BaseRepository from '../baseRepository';
import { RecruiterDAO } from '../../database/DAOs/recruiter/recruiter.dao';
import RecruiterProfileAggregated from '../../../application/DTOs/recruiter/recruiterProfileAggregatedData.dto';
import FindCompaniesQuery, {
  AppliedRecruitersQuery,
} from '../../../application/queries/recruiter.query';
import RecruiterProfileOverviewData from '../../../domain/entities/recruiter/recruiterProfilveOverviewData';
import FindRecruitersDBQuery from '../../../application/queries/recruiter.query';
import { PipelineStage } from 'mongoose';

export default class RecruiterRespository
  extends BaseRepository<Recruiter>
  implements IRecruiterRepo
{
  constructor() {
    super(RecruiterDAO);
  }
  //    async create(recruiter: Recruiter): Promise<SaveRecruiter> {
  //         const db = await connectDb()
  //         const result = await db.collection<Recruiter>(this._collection).insertOne(recruiter)
  //         return result
  //     }

  async findByEmail(email: string): Promise<Recruiter | null> {
    const result = await RecruiterDAO.findOne({ email: email });
    return result;
  }

  async findRecruitersPaginated(
    query: FindRecruitersDBQuery
  ): Promise<{ recruiters: RecruiterProfileOverviewData[]; totalPages: number } | null> {
    const { search, page, sortOption, employer_type_filter, employer_status_filter, limit } = query;
    const skip = (page - 1) * limit;
    let searchQuery = {};
    const aggPipeline: any[] = [
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'userProfile',
        },
      },
      { $unwind: '$userProfile' },
      {
        $lookup: {
          from: 'jobs',
          localField: 'userId',
          foreignField: 'recruiterId',
          as: 'jobs',
        },
      },
      {
        $addFields: {
          isSuspended: { $ifNull: ['$isSuspended', false] },
          isDeleted: { $ifNull: ['$isDeleted', false] },
        },
      },
    ];

    if (search) {
      searchQuery = {
        $or: [
          { 'userProfile.name': { $regex: new RegExp(search, 'i') } },
          { 'userProfile.email': { $regex: new RegExp(search, 'i') } },
          { organizationDetails: { $regex: new RegExp(search, 'i') } },
        ],
      };
    }

    const filterQuery = {
      employerType: { $in: employer_type_filter },
      ...employer_status_filter,
    };
    const totalDocs = await RecruiterDAO.aggregate([
      ...aggPipeline,
      { $match: searchQuery },
      { $match: filterQuery },
      { $count: 'totalRecruiters' },
    ]);
    aggPipeline.push(
      { $match: searchQuery },
      { $match: filterQuery },
      { $skip: skip },
      { $limit: limit }
    );
    const docs = await RecruiterDAO.aggregate(aggPipeline);
    const totalPages = Math.ceil((totalDocs[0]?.totalRecruiters ?? 0) / limit) || 0;

    return { recruiters: docs, totalPages };
  }

  async findRecruiters(query: FindRecruitersDBQuery): Promise<Recruiter[] | null> {
    const { search, sortOption, limit, page, employer_type_filter } = query;
    const skip = (page - 1) * limit;
    const searchQuery = search ? { companyName: { $regex: new RegExp(search, 'i') } } : {};
    const filterQuery = { employerType: { $in: employer_type_filter } };
    const currentSort = sortOption;
    const pipeLine: any = [];

    pipeLine.push({ $match: searchQuery });
    pipeLine.push({ $match: filterQuery });
    pipeLine.push({ $sort: sortOption });
    pipeLine.push({ $skip: skip });
    pipeLine.push({ $limit: limit });

    const recruiters = await RecruiterDAO.aggregate(pipeLine);
    return recruiters;
  }

  async findById(id: string): Promise<Recruiter | null> {
    const result = RecruiterDAO.findOne({ _id: new ObjectId(id) });
    return result;
  }

  async findByUserName(username: string): Promise<Recruiter | null> {
    const result = await RecruiterDAO.findOne({ username: username });
    return result;
  }

  async verifyRecruiter(email: string): Promise<Recruiter | null> {
    const result = await RecruiterDAO.findOneAndUpdate(
      { email: email },
      { $set: { isVerified: true } },
      { returnDocument: 'after' }
    );
    return result;
  }

  async updateIntroDetails(
    id: string,
    companyName: string,
    about: string,
    benefits: string,
    companyType: string,
    industryType: string,
    teamStrength: string,
    yearOfEstablishment: string,
    website: string,
    vision: string,
    country: string,
    state: string,
    city: string,
    mobile: string
  ): Promise<Recruiter | null> {
    const result = await RecruiterDAO.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          companyName: companyName,
          about: about,
          benefit: benefits,
          companyType: companyType,
          industry: industryType,
          teamStrength: teamStrength,
          foundIn: yearOfEstablishment,
          website: website,
          vision: vision,
          'location.country': country,
          'location.city': city,
          'location.state': state,
          phone: mobile,
        },
      },
      { returnDocument: 'after' }
    );

    return result;
  }

  async blockRecruiter(id: string): Promise<boolean> {
    const blockResult = await RecruiterDAO.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          isBlocked: true,
          isSuspended: true,
        },
      }
    );

    return blockResult.acknowledged;
  }

  async unblockRecruiter(id: string): Promise<boolean> {
    const unblockResult = await RecruiterDAO.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          isBlocked: false,
          isSuspended: false,
        },
      }
    );

    return unblockResult.acknowledged;
  }

  async deleteRecruiter(id: string): Promise<boolean> {
    const deleteResult = await RecruiterDAO.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          isDeleted: true,
        },
      }
    );
    return deleteResult.acknowledged;
  }

  async getRecruiterProfileOverview(
    recruiterId: string
  ): Promise<RecruiterProfileOverviewData | null> {
    if (!ObjectId.isValid(recruiterId)) return null;
    // console.log('---request id reached in the repo ---', recruiterId)
    const result = await RecruiterDAO.aggregate([
      { $match: { userId: new ObjectId(recruiterId) } },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'userProfile',
        },
      },
      { $unwind: '$userProfile' },
      {
        $lookup: {
          from: 'jobs',
          localField: 'recruiterId',
          foreignField: 'userProfile._id',
          as: 'jobs',
        },
      },
    ]);

    //console.log('--- result before sending back to client ---', result)
    return result.length > 0 ? result[0] : null;
  }

  async getAppliedRecruitersData(
    query: AppliedRecruitersQuery
  ): Promise<RecruiterProfileOverviewData[] | null> {
    const { search, profileStatus } = query;
    console.log('-- query inside the repo --', query);
    let matchFilter: any = {};
    //manage search for username or email or organization name

    if (search) {
      matchFilter = {
        $or: [
          { 'userProfile.name': { $regex: new RegExp(search, 'i') } },
          { 'userProfile.email': { $regex: new RegExp(search, 'i') } },
          { 'organizationDetails.organizationName': { $regex: new RegExp(search, 'i') } },
        ],
        profileStatus: { $in: profileStatus },
      };
    } else {
      matchFilter = {
        profileStatus: { $in: profileStatus },
      };
    }

    const piepeLine: any[] = [
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'userProfile',
        },
      },
      { $unwind: '$userProfile' },
      { $match: matchFilter },
      { $sort: { createdAt: -1 } },
    ];

    const result = await RecruiterDAO.aggregate(piepeLine);
    //console.log('---recruiter data ---', result)
    return result;
  }

  // async aggregateRecruiterProfile(
  //   id: string
  // ): Promise<RecruiterProfileAggregated | null> {
  //   const result = await RecruiterDAO.aggregate([
  //     {
  //       $match: {
  //         userId: new ObjectId(id),
  //       },
  //     },
  //     {
  //       $lookup: {
  //         from: 'jobs',
  //         let: { recruiterId: '$_id' },
  //         pipeline: [
  //           {
  //             $match: {
  //               $expr: { $eq: ['$companyId', '$$recruiterId'] },
  //             },
  //           },
  //           {
  //             $lookup: {
  //               from: 'jobapplications',
  //               let: { jobId: '$_id' },
  //               pipeline: [
  //                 {
  //                   $match: {
  //                     $expr: { $eq: ['$jobId', '$$jobId'] },
  //                   },
  //                 },
  //               ],
  //               as: 'applications',
  //             },
  //           },
  //           {
  //             $addFields: {
  //               applicantCount: { $size: '$applications' },
  //             },
  //           },
  //           {
  //             $project: {
  //               applications: 0,
  //             },
  //           },
  //         ],
  //         as: 'jobs',
  //       },
  //     },
  //   ]);

  //   return result[0];
  // }
}
