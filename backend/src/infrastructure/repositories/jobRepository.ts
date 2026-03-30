import Job from '../../domain/entities/job/job.entity';
import IJobRepo from '../../domain/interfaces/IJobRepo';
import { ObjectId } from 'mongodb';
import BaseRepository from './baseRepository';
import { JobDAO } from '../database/DAOs/recruiter/job.dao';
import JobAggregated from '../../domain/entities/job/jobAggregated.entity';
import {
  AdminLoadJobsQuery,
  JobsQuery,
  LoadJobsAggregatedListForPublicQuery,
} from '../../application/queries/job/jobs.query';
import JobAggregatedData from '../../domain/entities/job/jobAggregatedData.entity';
import mongoose from 'mongoose';
import AdminJobAggregatedEntity from '../../domain/entities/job/adminJobAggregated.entity';
import JobListAggregatedForPublic from '../../domain/entities/job/jobListAggregatedForPublic.entity';

export default class JobRepository extends BaseRepository<Job> implements IJobRepo {
  constructor() {
    super(JobDAO);
  }

  async getRecruiterJobsByRecruiterId(
    recruiterId: string,
    dbQuery: JobsQuery
  ): Promise<{ jobs: Job[]; totalPages: number; totalDocs: number; page: number } | null> {
    if (!ObjectId.isValid(recruiterId)) return null;
    const { search, limit, page, jobStatusFilter, jobWorkModeFilter } = dbQuery;
    const skip = (page - 1) * limit;
    const result = await JobDAO.aggregate([
      {
        $match: {
          jobTitle: { $regex: new RegExp(search, 'i') },
          status: { $in: jobStatusFilter },
          workMode: { $in: jobWorkModeFilter },
          recruiterId: new mongoose.Types.ObjectId(recruiterId),
        },
      },
      {
        $facet: {
          jobs: [{ $sort: { createdAt: -1 } }, { $skip: skip }, { $limit: limit }],
          metaData: [{ $count: 'totalDocs' }],
        },
      },
    ]);

    const jobs = result[0]?.jobs || [];
    const totalDocs = result[0]?.metaData[0]?.totalDocs;

    const totalPages = Math.ceil(totalDocs / limit) || 0;
    return { jobs, page, totalDocs, totalPages };
  }

  async getJobs(dbQuery: JobsQuery): Promise<{
    jobs: JobAggregatedData[];
    totalPages: number;
    totalDocs: number;
    page: number;
  } | null> {
    //change strict to later
    const { sortOption, skip, search, filter, limit, page, locationSearch } = dbQuery;
    const matchFilter: { [key: string]: object } = {};
    console.log(sortOption);
    if (search) {
      matchFilter['jobTitle'] = { $regex: new RegExp(search, 'i') };
    }

    if (locationSearch) {
      matchFilter['location'] = { $regex: new RegExp(locationSearch, 'i') };
    }

    if (filter?.workMode && filter.workMode.length > 0) {
      matchFilter['workMode'] = { $in: filter.workMode };
    }

    if (filter?.jobType && filter.jobType.length > 0) {
      matchFilter['jobType'] = { $in: filter.jobType };
    }

    if (filter?.jobLevel && filter.jobLevel.length > 0) {
      matchFilter['jobLevel'] = { $in: filter.jobLevel };
    }

    // const jobsFetchingPipeline: any[] = [
    //   { $match: matchFilter },
    //   {
    //     $lookup: {
    //       from: 'users',
    //       localField: 'recruiterId',
    //       foreignField: '_id',
    //       as: 'userDetails',
    //     },
    //   },
    //   { $unwind: '$userDetails' },
    //   {
    //     $lookup: {
    //       from: 'recruiters',
    //       localField: 'userDetails._id',
    //       foreignField: 'userId',
    //       as: 'recruiterProfile',
    //     },
    //   },
    //   { $unwind: '$recruiterProfile' },
    //   { $sort: sortOption },
    //   { $skip: skip },
    //   { $limit: limit },
    // ];

    // const totalJobsPipeline = [{ $match: matchFilter }, { $count: 'count' }];
    // const [jobs, totalJobs] = await Promise.all([
    //   JobDAO.aggregate(jobsFetchingPipeline),
    //   JobDAO.aggregate(totalJobsPipeline),
    // ]);

    const result = await JobDAO.aggregate([
      {
        $match: {
          jobTitle: { $regex: new RegExp(search, 'i') },
        },
      },
      {
        $facet: {
          jobs: [
            {
              $lookup: {
                from: 'users',
                localField: 'recruiterId',
                foreignField: '_id',
                as: 'userDetails',
              },
            },
            { $unwind: '$userDetails' },
            {
              $lookup: {
                from: 'recruiters',
                localField: 'userDetails._id',
                foreignField: 'userId',
                as: 'recruiterProfile',
              },
            },
            { $unwind: '$recruiterProfile' },
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: limit },
          ],
          metaData: [{ $count: 'totalDocs' }],
        },
      },
    ]);
    const jobResult = result[0]?.jobs || [];
    const totalPages = result[0]?.metaData[0]?.totalDocs;
    return { jobs: jobResult, totalPages, page, totalDocs: 12 };
  }

  async getJobDetails(id: string): Promise<JobAggregated | null> {
    const result = await JobDAO.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'recruiterId',
          foreignField: '_id',
          as: 'userProfile',
        },
      },
      { $unwind: '$userProfile' },
      {
        $lookup: {
          from: 'recruiters',
          localField: 'userProfile._id',
          foreignField: 'userId',
          as: 'userRecruiterProfile',
        },
      },
      { $unwind: '$userRecruiterProfile' },
      {
        $lookup: {
          from: 'jobapplications',
          localField: '_id',
          foreignField: 'jobId',
          as: 'applications',
        },
      },
      {
        $lookup: {
          from: 'companies',
          localField: 'userRecruiterProfile.companyId',
          foreignField: '_id',
          as: 'companyProfileDetails',
        },
      },
      { $unwind: { path: '$companyProfileDetails', preserveNullAndEmptyArrays: true } },
      {
        $addFields: {
          candidateIds: {
            $map: {
              input: '$applications',
              as: 'app',
              in: '$$app.candidateId',
            },
          },
        },
      },
      {
        $project: {
          applications: 0,
        },
      },
      { $match: { _id: new ObjectId(id) } },
    ]);
    return result[0] || null;
  }

  async blockJob(id: string): Promise<boolean> {
    const result = await JobDAO.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          isBlocked: true,
        },
      }
    );

    return result.acknowledged;
  }

  async unblockJob(id: string): Promise<boolean> {
    // const db = await connectDb()
    const result = await JobDAO.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          isBlocked: false,
        },
      }
    );

    return result.acknowledged;
  }

  async rejectJob(id: string): Promise<boolean> {
    const result = await JobDAO.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          isRejected: true,
        },
      }
    );

    return result.acknowledged;
  }

  async unrejectJob(id: string): Promise<boolean> {
    const result = await JobDAO.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          isRejected: false,
        },
      }
    );

    return result.acknowledged;
  }

  async incraseApplicationCount(id: string): Promise<Job | null> {
    if (!ObjectId.isValid(id)) return null;
    const result = await JobDAO.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $inc: { applicationsCount: 1 } },
      { returnDocument: 'after' }
    );

    return result;
  }

  async searchJobsFromHome(search: string = ''): Promise<JobAggregated[] | null> {
    const result = await JobDAO.aggregate([
      {
        $lookup: {
          from: 'recruiters',
          localField: 'companyId',
          foreignField: '_id',
          as: 'companyDetails',
        },
      },
      { $unwind: '$companyDetails' },
      { $match: { jobTitle: { $regex: new RegExp(search, 'i') } } },
    ]);
    return result;
  }

  async getRecruiterRecentJobs(
    recruiterId: string
  ): Promise<{ jobs: Job[]; totalPages: number; totalDocs: number; page: number } | null> {
    if (!mongoose.isValidObjectId(recruiterId)) return null;
    const result = await JobDAO.find({ recruiterId: new ObjectId(recruiterId) })
      .sort({ createdAt: -1 })
      .limit(3)
      .lean();

    return {
      jobs: result,
      totalPages: 1,
      totalDocs: result.length,
      page: 1,
    };
  }

  async getJobsListForAdmin(
    query: AdminLoadJobsQuery
  ): Promise<{ jobs: AdminJobAggregatedEntity[]; totalPages: number } | null> {
    const { search, limit, page, statusFilter, jobTypeFilter, reportsCount } = query;
    const skip = (page - 1) * limit;
    console.log('-- inspecting job type filter before queriying --', jobTypeFilter);
    const result = await JobDAO.aggregate([
      {
        $match: {
          jobTitle: { $regex: new RegExp(search, 'i') },
          status: { $in: statusFilter },
          jobType: { $in: jobTypeFilter },
          reportsCount: { $gte: reportsCount },
        },
      },
      {
        $facet: {
          jobs: [
            {
              $lookup: {
                from: 'users',
                localField: 'recruiterId',
                foreignField: '_id',
                as: 'userDetails',
              },
            },
            {
              $unwind: {
                path: '$userDetails',
                preserveNullAndEmptyArrays: true,
              },
            },
            {
              $lookup: {
                from: 'recruiters',
                localField: 'userDetails._id',
                foreignField: 'userId',
                as: 'recruiterDetails',
              },
            },
            {
              $unwind: {
                path: '$recruiterDetails',
                preserveNullAndEmptyArrays: true,
              },
            },
            {
              $lookup: {
                from: 'companies',
                localField: 'recruiterDetails.companyId',
                foreignField: '_id',
                as: 'companyDetails',
              },
            },
            {
              $unwind: {
                path: '$companyDetails',
                preserveNullAndEmptyArrays: true,
              },
            },
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: 20 },
          ],
          metaData: [{ $count: 'totalDocs' }],
        },
      },
    ]);

    const jobs = result[0]?.jobs || [];
    const totalDocs = result[0]?.metaData[0]?.totalDocs;
    const totalPages = Math.ceil(totalDocs / limit) || 0;

    return { jobs, totalPages };
  }

  async getJobDetailsForAdmin(jobId: string): Promise<AdminJobAggregatedEntity | null> {
    if (!mongoose.isValidObjectId(jobId)) return null;

    const result = await JobDAO.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(jobId) } },
      {
        $lookup: {
          from: 'users',
          localField: 'recruiterId',
          foreignField: '_id',
          as: 'userDetails',
        },
      },
      {
        $unwind: {
          path: '$userDetails',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'recruiters',
          localField: 'userDetails._id',
          foreignField: 'userId',
          as: 'recruiterDetails',
        },
      },
      {
        $unwind: {
          path: '$recruiterDetails',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'companies',
          localField: 'recruiterDetails.companyId',
          foreignField: '_id',
          as: 'companyDetails',
        },
      },
      {
        $unwind: {
          path: '$companyDetails',
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);

    return result[0];
  }

  async getJobListForPublic(
    query: LoadJobsAggregatedListForPublicQuery
  ): Promise<{ jobs: JobListAggregatedForPublic[]; totalPages: number } | null> {
    const { search, locationSearch, page, limit, jobLevelFilter, jobTypeFilter, workModeFilter } =
      query;
    console.log('- checking job level filter before queriying -', jobLevelFilter);
    const skip = (page - 1) * limit;
    const result = await JobDAO.aggregate([
      {
        $match: {
          status: 'active',
          jobTitle: { $regex: new RegExp(search, 'i') },
          workMode: { $in: workModeFilter },
          jobLevel: { $in: jobLevelFilter },
          jobType: { $in: jobTypeFilter },
          location: { $regex: new RegExp(locationSearch, 'i') },
        },
      },
      {
        $facet: {
          jobs: [
            {
              $lookup: {
                from: 'users',
                localField: 'recruiterId',
                foreignField: '_id',
                as: 'userProfileDetails',
              },
            },
            { $unwind: { path: '$userProfileDetails', preserveNullAndEmptyArrays: true } },
            {
              $lookup: {
                from: 'recruiters',
                localField: 'recruiterId',
                foreignField: 'userId',
                as: 'recruiterProfileDetails',
              },
            },
            { $unwind: { path: '$recruiterProfileDetails', preserveNullAndEmptyArrays: true } },
            {
              $lookup: {
                from: 'companies',
                localField: 'recruiterProfileDetails.companyId',
                foreignField: '_id',
                as: 'companyProfileDetails',
              },
            },
            { $unwind: { path: '$companyProfileDetails', preserveNullAndEmptyArrays: true } },
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: limit },
          ],
          metaData: [{ $count: 'totalDocs' }],
        },
      },
    ]);

    const jobs = result[0]?.jobs;
    const totalDocs = result[0]?.metaData[0]?.totalDocs;
    console.log('--- inspecitng total number of jobs and fetched count ', totalDocs, 'out of ', 8);
    const totalPages = Math.ceil(totalDocs / limit);

    return { jobs, totalPages };
  }

  async getRecommendedJobs(query: string): Promise<JobAggregated[] | null> {
    console.log('- checking constructed query --', query);
    const result = await JobDAO.aggregate([
      {
        $match: {
          status: 'active',
          // isFlagged: false,
          $text: {
            $search: query,
          },
        },
      },
      {
        $addFields: {
          score: { $meta: 'textScore' },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'recruiterId',
          foreignField: '_id',
          as: 'userProfile',
        },
      },
      {
        $unwind: {
          path: '$userProfile',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'recruiters',
          localField: 'userProfile._id',
          foreignField: 'userId',
          as: 'userRecruiterProfile',
        },
      },
      {
        $unwind: {
          path: '$userRecruiterProfile',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'companies',
          localField: 'userRecruiterProfile.companyId',
          foreignField: '_id',
          as: 'companyDetails',
        },
      },
      { $unwind: { path: '$companyDetails', preserveNullAndEmptyArrays: true } },
      {
        $match: {
          userProfile: { $exists: true },
        },
      },
      { $sort: { score: -1 } },
      { $limit: 4 },
    ]);

    return result;
  }
}
