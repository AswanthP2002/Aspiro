import Recruiter from '../../../domain/entities/recruiter/recruiter.entity';
import { SaveRecruiter } from '../../../domain/interfaces/recruiter/createRecruiterRequest';
import IRecruiterRepo from '../../../domain/interfaces/recruiter/IRecruiterRepo';
import { Db, ObjectId } from 'mongodb';
import BaseRepository from '../baseRepository';
import { RecruiterDAO } from '../../database/DAOs/recruiter/recruiter.dao';
import RecruiterProfileAggregated from '../../../application/DTOs/recruiter/recruiterProfileAggregatedData.dto';
import FindCompaniesQuery from '../../../application/queries/recruiter.query';
import RecruiterProfileOverviewData from '../../../domain/entities/recruiter/recruiterProfilveOverviewData';

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

  async findRecruiters(query: FindCompaniesQuery): Promise<Recruiter[] | null> {
    const { search, sortOption, limit, page } = query;
    const skip = (page - 1) * limit;
    const searchQuery = search
      ? { companyName: { $regex: new RegExp(search, 'i') } }
      : {};
    const currentSort = sortOption;
    const pipeLine = [];

    pipeLine.push({ $match: searchQuery });
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
        },
      }
    );

    return unblockResult.acknowledged;
  }

  async deleteRecruiter(id: string): Promise<boolean> {
    const deleteResult = await RecruiterDAO.deleteOne({
      _id: new ObjectId(id),
    });
    return deleteResult.acknowledged;
  }

  async getRecruiterProfileOverview(recruiterId: string): Promise<RecruiterProfileOverviewData | null> {
    if(!ObjectId.isValid(recruiterId)) return null

    const result = await RecruiterDAO.aggregate([
      {$match:{userId:new ObjectId(recruiterId)}},
      {$lookup:{
        from:'users',
        localField:'userId',
        foreignField:'_id',
        as:'userProfile'
      }},
      {$unwind:'$userProfile'},
      {$lookup:{
        from:'jobs',
        localField:'recruiterId',
        foreignField:'userProfile._id',
        as:'jobs'
      }}
    ])

    return result[0]
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
