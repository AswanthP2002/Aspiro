import { NewRecruiter } from '../../../domain/entities/recruiter/recruiter.entity';
import IRecruiterRepo from '../../../domain/interfaces/recruiter/IRecruiterRepo';
import { ObjectId } from 'mongodb';
import BaseRepository from '../baseRepository';
import { RecruiterDAO } from '../../database/DAOs/recruiter/recruiter.dao';
import { AppliedRecruitersQuery } from '../../../application/queries/recruiter.query';
import RecruiterProfileOverviewData from '../../../domain/entities/recruiter/recruiterProfilveOverviewData';
import FindRecruitersDBQuery from '../../../application/queries/recruiter.query';
import mongoose from 'mongoose';

export default class RecruiterRespository
  extends BaseRepository<NewRecruiter>
  implements IRecruiterRepo
{
  constructor() {
    super(RecruiterDAO);
  }

  async findRecruitersPaginated(
    query: FindRecruitersDBQuery
  ): Promise<{ recruiters: RecruiterProfileOverviewData[]; totalPages: number } | null> {
    const { search, page, limit, employer_type_filter, employer_status_filter, sortOption } = query;
    const skip = (page - 1) * limit;
    const result = await RecruiterDAO.aggregate([
      {
        $match: {
          $or: [
            { fullName: { $regex: new RegExp(search, 'i') } },
            { email: { $regex: new RegExp(search, 'i') } },
          ],
          profileStatus: 'approved',
          recruiterType: { $in: employer_type_filter },
          isVerified: { $in: employer_status_filter },
        },
      },
      {
        $facet: {
          recruiters: [
            {
              $lookup: {
                from: 'companies',
                localField: 'companyId',
                foreignField: '_id',
                as: 'companyDetails',
              },
            },
            { $unwind: { path: '$companyDetails', preserveNullAndEmptyArrays: true } },
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: limit },
          ],
          metaData: [{ $count: 'totalDocs' }],
        },
      },
    ]);

    const allRecruiters = result[0]?.recruiters || [];
    const totalDocs = result[0]?.metaData[0]?.totalDocs || 0;
    const totalPages = Math.floor(totalDocs / limit);
    console.log('-- inspecting fetched recruiters --', allRecruiters.length);
    console.log('-- inspecitn total pages --', totalPages);

    return { recruiters: allRecruiters, totalPages: totalPages };

    // 1. Build a Dynamic Match Object
    // const matchConditions: any = {
    //   profileStatus: { $ne: 'pending' }, // Move global filters here
    //   isDeleted: { $ne: true }, // Usual safety check
    // };

    // // 2. Add Search only if it exists
    // if (search) {
    //   matchConditions.$or = [
    //     { 'userProfile.name': { $regex: new RegExp(search, 'i') } },
    //     { 'userProfile.email': { $regex: new RegExp(search, 'i') } },
    //     { organizationDetails: { $regex: new RegExp(search, 'i') } },
    //   ];
    // }

    // // 3. Add Filter only if array has values
    // if (employer_type_filter && employer_type_filter.length > 0) {
    //   matchConditions.employerType = { $in: employer_type_filter };
    // }

    // const aggPipeline: any[] = [
    //   {
    //     $lookup: {
    //       from: 'users',
    //       localField: 'userId',
    //       foreignField: '_id',
    //       as: 'userProfile',
    //     },
    //   },
    //   { $unwind: '$userProfile' },
    //   { $match: { iverified: true } }, // Match EARLY for performance
    //   {
    //     $lookup: {
    //       from: 'jobs',
    //       localField: 'userId',
    //       foreignField: 'recruiterId',
    //       as: 'jobs',
    //     },
    //   },
    //   {
    //     $addFields: {
    //       isSuspended: { $ifNull: ['$isSuspended', false] },
    //       isDeleted: { $ifNull: ['$isDeleted', false] },
    //     },
    //   },
    // ];

    // // Get total count using the same matchConditions
    // const totalDocs = await RecruiterDAO.aggregate([
    //   {
    //     $match: {
    //       $or: [
    //         { fullName: { $regex: new RegExp(search, 'i') } },
    //         { email: { $regex: new RegExp(search, 'i') } },
    //       ],
    //       profileStatus: 'approved',
    //       recruiterType: { $in: employer_type_filter },
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: 'users',
    //       localField: 'userId',
    //       foreignField: '_id',
    //       as: 'userProfile',
    //     },
    //   },
    //   { $unwind: '$userProfile' },
    //   {
    //     $lookup: {
    //       from: 'companies',
    //       localField: 'companyId',
    //       foreignField: '_id',
    //       as: 'companyDetails',
    //     },
    //   },
    //   { $unwind: { path: '$companyDetails', preserveNullAndEmptyArrays: true } },
    //   { $sort: { createdAt: -1 } },
    //   { $count: 'totalRecruiters' },
    // ]);

    // // Add Pagination to the main pipeline
    // aggPipeline.push(
    //   { $sort: { createdAt: -1 } }, // Always good to have a default sort
    //   { $skip: skip },
    //   { $limit: limit }
    // );

    // const docs = await RecruiterDAO.aggregate([
    //   {
    //     $match: {
    //       $or: [
    //         { fullName: { $regex: new RegExp(search, 'i') } },
    //         { email: { $regex: new RegExp(search, 'i') } },
    //       ],
    //       profileStatus: 'approved',
    //       recruiterType: { $in: employer_type_filter },
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: 'users',
    //       localField: 'userId',
    //       foreignField: '_id',
    //       as: 'userProfile',
    //     },
    //   },
    //   { $unwind: '$userProfile' },
    //   {
    //     $lookup: {
    //       from: 'companies',
    //       localField: 'companyId',
    //       foreignField: '_id',
    //       as: 'companyDetails',
    //     },
    //   },
    //   { $unwind: { path: '$companyDetails', preserveNullAndEmptyArrays: true } },
    //   { $sort: { createdAt: -1 } },
    //   { $limit: limit },
    //   { $skip: skip },
    // ]);
    // const totalPages = Math.ceil((totalDocs[0]?.totalRecruiters ?? 0) / limit) || 0;
    // console.log('--total pages--', totalPages);
    // return { recruiters: docs, totalPages };
  }

  // async findRecruiters(query: FindRecruitersDBQuery): Promise<Recruiter[] | null> {
  //   const { search, sortOption, limit, page, employer_type_filter } = query;
  //   const skip = (page - 1) * limit;
  //   const searchQuery = search ? { companyName: { $regex: new RegExp(search, 'i') } } : {};
  //   const filterQuery = { employerType: { $in: employer_type_filter } };
  //   const currentSort = sortOption;
  //   const pipeLine: any = [];

  //   pipeLine.push({ $match: searchQuery });
  //   pipeLine.push({ $match: filterQuery });
  //   pipeLine.push({ $sort: sortOption });
  //   pipeLine.push({ $skip: skip });
  //   pipeLine.push({ $limit: limit });

  //   const recruiters = await RecruiterDAO.aggregate(pipeLine);
  //   return recruiters;
  // }

  // async findById(id: string): Promise<Recruiter | null> {
  //   const result = RecruiterDAO.findOne({ _id: new ObjectId(id) });
  //   return result;
  // }

  // async findByUserName(username: string): Promise<Recruiter | null> {
  //   const result = await RecruiterDAO.findOne({ username: username });
  //   return result;
  // }

  // async verifyRecruiter(email: string): Promise<Recruiter | null> {
  //   const result = await RecruiterDAO.findOneAndUpdate(
  //     { email: email },
  //     { $set: { isVerified: true } },
  //     { returnDocument: 'after' }
  //   );
  //   return result;
  // }

  // async updateIntroDetails(
  //   id: string,
  //   companyName: string,
  //   about: string,
  //   benefits: string,
  //   companyType: string,
  //   industryType: string,
  //   teamStrength: string,
  //   yearOfEstablishment: string,
  //   website: string,
  //   vision: string,
  //   country: string,
  //   state: string,
  //   city: string,
  //   mobile: string
  // ): Promise<Recruiter | null> {
  //   const result = await RecruiterDAO.findOneAndUpdate(
  //     { _id: new ObjectId(id) },
  //     {
  //       $set: {
  //         companyName: companyName,
  //         about: about,
  //         benefit: benefits,
  //         companyType: companyType,
  //         industry: industryType,
  //         teamStrength: teamStrength,
  //         foundIn: yearOfEstablishment,
  //         website: website,
  //         vision: vision,
  //         'location.country': country,
  //         'location.city': city,
  //         'location.state': state,
  //         phone: mobile,
  //       },
  //     },
  //     { returnDocument: 'after' }
  //   );

  //   return result;
  // }

  // async blockRecruiter(id: string): Promise<boolean> {
  //   const blockResult = await RecruiterDAO.updateOne(
  //     { _id: new ObjectId(id) },
  //     {
  //       $set: {
  //         isBlocked: true,
  //         isSuspended: true,
  //       },
  //     }
  //   );

  //   return blockResult.acknowledged;
  // }

  // async unblockRecruiter(id: string): Promise<boolean> {
  //   const unblockResult = await RecruiterDAO.updateOne(
  //     { _id: new ObjectId(id) },
  //     {
  //       $set: {
  //         isBlocked: false,
  //         isSuspended: false,
  //       },
  //     }
  //   );

  //   return unblockResult.acknowledged;
  // }

  // async deleteRecruiter(id: string): Promise<boolean> {
  //   const deleteResult = await RecruiterDAO.updateOne(
  //     { _id: new ObjectId(id) },
  //     {
  //       $set: {
  //         isDeleted: true,
  //       },
  //     }
  //   );
  //   return deleteResult.acknowledged;
  // }

  async getRecruiterProfileOverview(
    recruiterId: string
  ): Promise<RecruiterProfileOverviewData | null> {
    if (!ObjectId.isValid(recruiterId)) return null;
    // console.log('---request id reached in the repo ---', recruiterId)
    const result = await RecruiterDAO.aggregate([
      { $match: { userId: new ObjectId(recruiterId) } },
      {
        $lookup: {
          from: 'companies',
          localField: 'companyId',
          foreignField: '_id',
          as: 'companyDetails',
        },
      },
      { $unwind: { path: '$companyDetails', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'userProfile',
        },
      },
      { $unwind: '$userProfile' },
      // {
      //   $lookup: {
      //     from: 'jobs',
      //     localField: 'recruiterId',
      //     foreignField: 'userProfile._id',
      //     as: 'jobs',
      //   },
      // },
      {
        $lookup: {
          from: 'jobs',
          let: { recruiter_user_id: '$userId' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$recruiterId', '$$recruiter_user_id'],
                },
              },
            },
            { $sort: { createdAt: -1 } },
            { $limit: 5 },
          ],
          as: 'jobs',
        },
      },
    ]);

    //console.log('--- result before sending back to client ---', result)
    return result.length > 0 ? result[0] : null;
  }

  async getAppliedRecruitersData(
    query: AppliedRecruitersQuery
  ): Promise<{ applications: RecruiterProfileOverviewData[]; totalPages: number } | null> {
    const { page, limit } = query;
    const skip = (page - 1) * limit;
    // console.log('-- query inside the repo --', query);
    // let matchFilter: any = {};
    //manage search for username or email or organization name

    // if (search) {
    //   matchFilter = {
    //     $or: [
    //       { 'userProfile.name': { $regex: new RegExp(search, 'i') } },
    //       { 'userProfile.email': { $regex: new RegExp(search, 'i') } },
    //       { 'organizationDetails.organizationName': { $regex: new RegExp(search, 'i') } },
    //     ],
    //     profileStatus: { $in: profileStatus },
    //   };
    // } else {
    //   matchFilter = {
    //     profileStatus: { $in: profileStatus },
    //   };
    // }

    // const piepeLine: any[] = [
    //   {
    //     $lookup: {
    //       from: 'users',
    //       localField: 'userId',
    //       foreignField: '_id',
    //       as: 'userProfile',
    //     },
    //   },
    //   { $unwind: '$userProfile' },
    //   { $match: matchFilter },
    //   { $sort: { createdAt: -1 } },
    // ];
    console.log('expected aggregation line revoked');
    console.log('-- page --', page);
    console.log('-- limit --', limit);
    console.log('-- skip --', skip);
    const result = await RecruiterDAO.aggregate([
      {
        $match: {
          profileStatus: { $in: ['pending', 'under-review'] },
        },
      },
      {
        $facet: {
          data: [
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: limit },
            {
              $lookup: {
                from: 'companies',
                localField: 'companyId',
                foreignField: '_id',
                as: 'companyDetails',
              },
            },
            { $unwind: { path: '$companyDetails', preserveNullAndEmptyArrays: true } },
            {
              $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'userProfile',
              },
            },
            { $unwind: { path: '$userProfile', preserveNullAndEmptyArrays: true } },
          ],
          metaData: [{ $count: 'total' }],
        },
      },
    ]);
    const data = result[0]?.data || [];
    const totalDocs = result[0]?.metaData[0]?.total;
    const totalPages = Math.ceil(totalDocs / limit);
    console.log('--checking data--', data);
    return { applications: data, totalPages };
  }

  async getRecruiterAggregatedDetailsById(
    id: string
  ): Promise<RecruiterProfileOverviewData | null> {
    const result = await RecruiterDAO.aggregate([
      { $match: { _id: new ObjectId(id) } },
      {
        $lookup: {
          from: 'companies',
          localField: 'companyId',
          foreignField: '_id',
          as: 'companyDetails',
        },
      },
      { $unwind: { path: '$companyDetails', preserveNullAndEmptyArrays: true } },
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

    return result.length > 0 ? result[0] : null;
  }

  async updateVerificationTimeLine(
    recruiterId: string,
    action: 'Verified' | 'Revoked'
  ): Promise<NewRecruiter | null> {
    const result = await RecruiterDAO.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(recruiterId) },
      { $push: { verificationTimeline: { action, actor: 'Admin' } } },
      { returnDocument: 'after' }
    );

    return result;
  }

  // //testing bulk aprove method
  // async bulkbulckUpdate(): Promise<Recruiter[] | null> {
  //   //find all docs with pending status
  //   const allPendings = await RecruiterDAO.find({ profileStatus: 'pending' });

  //   //update all pening to approve
  //   const updateresult = await RecruiterDAO.updateMany(
  //     { profileStatus: 'pending' },
  //     { $set: { profileStatus: 'approved' } }
  //   );

  //   //update the previously stored docuemtns based on the modification acknowledgement
  //   const locallyUpdated: Recruiter[] = [];
  //   if (updateresult.modifiedCount === allPendings.length) {
  //     allPendings.forEach((element) => {
  //       element.profileStatus = 'approved';
  //       locallyUpdated.push(element);
  //     });
  //   }

  //   //return this locally updated data
  //   return locallyUpdated;
  // }
}

//stoped at bulk approval implementation testing
