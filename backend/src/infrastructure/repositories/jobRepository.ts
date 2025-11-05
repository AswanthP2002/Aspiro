import Job from '../../domain/entities/recruiter/job.entity';
import IJobRepo from '../../domain/interfaces/IJobRepo';
import { SaveJob } from '../../domain/interfaces/IJobRepo';
import { Db, ObjectId } from 'mongodb';
import BaseRepository from './baseRepository';
import { JobDAO } from '../database/DAOs/recruiter/job.dao';
import { LoadJobRes } from '../../application/DTOs/loadJob.dto';
import JobAggregated from '../../domain/entities/jobAggregated.entity';
import { JobsQuery } from '../../application/queries/jobs.query';

export default class JobRepository
  extends BaseRepository<Job>
  implements IJobRepo
{
  constructor() {
    super(JobDAO);
  }

  // async create(job: Job): Promise<SaveJob> {
  //     const db = await connectDb()
  //     const result = await db.collection<Job>(this._collection).insertOne(job)
  //     return result
  // }

  async getRecruiterJobsByRecruiterId(
    recruiterId: string, dbQuery: JobsQuery
  ): Promise<{jobs: Job[], totalPages: number, totalDocs: number, page: number} | null> {
    if(!ObjectId.isValid(recruiterId)) return null
    console.log('checking data from the db side', recruiterId, dbQuery)
    const {sortOption, skip, search, filter, limit, page} = dbQuery

    const matchFilter: any = {recruiterId: new ObjectId(recruiterId)}

    if(search){
      matchFilter['jobTitle'] = {$regex: new RegExp(search, 'i')}
    }

    if(filter.status){
      matchFilter['status'] = {$in: filter.status}
    }

    if(filter.workMode){
      matchFilter['workMode'] = {$in: filter.workMode}
    }

    const jobsFetchingPipeline: any[] = [
      {$match: matchFilter},
      {$sort: sortOption},
      {$skip: skip},
      {$limit: limit}
    ]

    // console.log('jobs fetching pipeline', jobsFetchingPipeline)
    
    const totalJobsPipeline = [
      {$match: matchFilter},
      {$count: 'count'}
    ]

    const [jobs, totalJobs] = await Promise.all([
      JobDAO.aggregate(jobsFetchingPipeline),
      JobDAO.aggregate(totalJobsPipeline)
    ])

    const totalDocs = totalJobs[0]?.count || 0
    const totalPages = Math.ceil(totalDocs/limit)

    //console.log('Jobs before sending to the frontend', jobs)
    
    return {jobs, totalPages, totalDocs, page}
  }

  async getJobs(
    search: string = '',
    page: number = 1,
    limit: number = 3,
    sort: string = 'job-latest',
    filters: any,
    minSalary: string = '',
    maxSalary: string = ''
  ): Promise<LoadJobRes | null> {
    //change strict to later

    const prelookupMatch: any = { expiresAt: { $gte: new Date() } };
    const postlookupMatch: any = {};

    if (search) {
      prelookupMatch.jobTitle = { $regex: new RegExp(search, 'i') };
    }

    if (filters?.industry.length > 0) {
      postlookupMatch['companyDetails.industry'] = { $in: filters?.industry };
    }

    if (filters?.jobType.length > 0) {
      prelookupMatch.jobType = { $in: filters?.jobType };
    }

    if (filters?.locationType.length > 0) {
      prelookupMatch.locationType = { $in: filters?.locationType };
    }

    if (minSalary) {
      prelookupMatch.minSalary = { $gte: Number(minSalary) };
    }

    if (maxSalary) {
      prelookupMatch.maxSalary = { $lte: Number(maxSalary) };
    }

    //const match = search ? {$match:{jobTitle:{$regex: new RegExp(search, 'i')}}} : {$match:{}}
    const skip = (page - 1) * limit;
    const currentSort = sort;
    let sortData: any = {};
    const filterData: any = {};
    switch (sort) {
      case 'salary-high':
        sortData['minSalary'] = -1;
        break;
      case 'salary-low':
        sortData['maxSalary'] = 1;
        break;
      case 'job-latest':
        sortData['createdAt'] = -1;
        break;
      case 'job-oldest':
        sortData['createdAt'] = 1;
        break;
      case 'Name A - Z':
        sortData['JobTitle'] = 1;
        break;
      case 'Name Z - A':
        sortData['JobTitle'] = -1;
        break;
      default:
        sortData = {};
        break;
    }

    const pipeline: any[] = [
      { $match: prelookupMatch },
      {
        $lookup: {
          from: 'recruiters',
          localField: 'companyId',
          foreignField: '_id',
          as: 'companyDetails',
        },
      },
      { $unwind: '$companyDetails' },
      { $match: postlookupMatch },
      { $skip: skip },
      { $limit: limit },
    ];

    if (Object.keys(sortData).length > 0) {
      pipeline.push({ $sort: sortData });
    }

    const countPipeLine = [
      { $match: prelookupMatch },
      {
        $lookup: {
          from: 'recruiters',
          localField: 'companyId',
          foreignField: '_id',
          as: 'companyDetails',
        },
      },
      { $unwind: '$companyDetails' },
      { $match: postlookupMatch },
      { $count: 'count' },
    ];

    const jobs = await JobDAO.aggregate(pipeline);

    const totalDocumentsArray = await JobDAO.aggregate(countPipeLine);
    const totalDocumentsCount = totalDocumentsArray[0]?.count || 0;
    const totalPages =
      totalDocumentsArray.length > 0
        ? Math.ceil(totalDocumentsCount / limit)
        : 0;

    return { jobs, page, totalPages, currentSort: sort };
  }

  async getJobDetails(id: string): Promise<JobAggregated | null> {
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
      { $match: { _id: new ObjectId(id) } },
    ]);
    return result[0];
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

  async searchJobsFromHome(
    search: string = ''
  ): Promise<JobAggregated[] | null> {
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
}
