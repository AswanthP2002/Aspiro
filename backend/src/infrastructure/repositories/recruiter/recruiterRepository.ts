import { NewRecruiter } from '../../../domain/entities/recruiter/recruiter.entity';
import IRecruiterRepo from '../../../domain/interfaces/recruiter/IRecruiterRepo';
import { ObjectId } from 'mongodb';
import BaseRepository from '../baseRepository';
import { RecruiterDAO } from '../../database/DAOs/recruiter/recruiter.dao';
import { AppliedRecruitersQuery } from '../../../application/queries/recruiter/recruiter.query';
import RecruiterProfileOverviewData from '../../../domain/entities/recruiter/recruiterProfilveOverviewData';
import FindRecruitersDBQuery from '../../../application/queries/recruiter/recruiter.query';
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
    console.log(sortOption);
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
      { $unwind: { path: '$userProfile', preserveNullAndEmptyArrays: true } },
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

  async findRecruiterByUserId(userId: string): Promise<NewRecruiter | null> {
    if (!mongoose.isValidObjectId(userId)) return null;

    const result = await RecruiterDAO.findOne({ userId: new mongoose.Types.ObjectId(userId) });
    return result;
  }

  async getRecruiterCount(): Promise<{ count: number } | null> {
    const result = await RecruiterDAO.find({
      isVerified: true,
      profileStatus: 'approved',
      isRejected: false,
    }).countDocuments();

    return { count: result };
  }
}

//stoped at bulk approval implementation testing
