import Job from '../../domain/entities/recruiter/job.entity';
import IJobRepo from '../../domain/interfaces/IJobRepo';
import { SaveJob } from '../../domain/interfaces/IJobRepo';
import { Db, ObjectId } from 'mongodb';
import BaseRepository from './baseRepository';
import { JobDAO } from '../database/DAOs/recruiter/job.dao';
import { LoadJobRes } from '../../application/DTOs/loadJob.dto';
import JobAggregated from '../../domain/entities/jobAggregated.entity';
import { JobsQuery } from '../../application/queries/jobs.query';
import JobAggregatedData from '../../domain/entities/user/jobAggregated.entity';

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
    // console.log('checking data from the db side', recruiterId, dbQuery)
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

  async getJobs(dbQuery: JobsQuery): Promise<{jobs: JobAggregatedData[], totalPages: number, totalDocs: number, page: number} | null> {
    //change strict to later
    const {sortOption, skip, search, filter, limit, page, locationSearch} = dbQuery

    const matchFilter: any = {}
    
    const prelookupMatch: any = { expiresAt: { $gte: new Date() } };
    const postlookupMatch: any = {};

    if (search) {
      matchFilter['jobTitle'] = { $regex: new RegExp(search, 'i') };
    }

    if(locationSearch){
      matchFilter['location'] = { $regex: new RegExp(locationSearch, 'i') };
    }

    // if (filter.status && filter.status.length > 0) {
    //   matchFilter['status'] = { $in: filter.status };
    // }

    if (filter.workMode && filter.workMode.length > 0) {
      matchFilter['workMode'] = { $in: filter.workMode };
    }

    if (filter.jobType && filter.jobType.length > 0) {
      matchFilter['jobType'] = { $in: filter.jobType };
    }

    if (filter.jobLevel && filter.jobLevel.length > 0) {
      matchFilter['jobLevel'] = { $in: filter.jobLevel };
    }
    // console.log('testing match filter values', JSON.stringify(matchFilter))

    //const match = search ? {$match:{jobTitle:{$regex: new RegExp(search, 'i')}}} : {$match:{}}
    const jobsFetchingPipeline: any[] = [
      { $match: matchFilter },
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
      { $sort: sortOption },
      { $skip: skip },
      { $limit: limit },
    ];

    const totalJobsPipeline = [
      { $match: matchFilter },
      { $count: 'count'}
    ]

    //console.log('Pipeline before applying', jobsFetchingPipeline)

    const [jobs, totalJobs] = await Promise.all([
      JobDAO.aggregate(jobsFetchingPipeline),
      JobDAO.aggregate(totalJobsPipeline)
    ])

    const totalPages = Math.ceil(totalJobs[0]?.count || 0 / limit);
    const totalDocs = totalJobs[0]?.count || 0;

    //console.log('Testing job before retruing', jobs)

    return { jobs, totalPages, totalDocs, page };
  }

  async getJobDetails(id: string): Promise<JobAggregated | null> {
    const result = await JobDAO.aggregate([
      // {
      //   $lookup: {
      //     from: 'recruiters',
      //     localField: 'companyId',
      //     foreignField: '_id',
      //     as: 'companyDetails',
      //   },
      // },
      // { $unwind: '$companyDetails' },
      {$lookup: {
    from: 'users',
    localField: 'recruiterId',
    foreignField: '_id',
    as: 'userProfile'
  }},
  {$unwind:'$userProfile'},
  {$lookup: {
    from: 'recruiters',
    localField: 'userProfile._id',
    foreignField: 'userId',
    as: 'userRecruiterProfile'
  }},
  {$unwind:'$userRecruiterProfile'},
  {$lookup: {
    from: 'jobapplications',
    localField: '_id',
    foreignField: 'jobId',
    as: 'applications'
  }},
  {$addFields:{
    candidateIds:{
      $map:{
        input:'$applications',
        as:'app',
        in:'$$app.candidateId'
      }
    }
  }},
  {$project:{
    applications:0
  }},
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
    if(!ObjectId.isValid(id)) return null
    const result = await JobDAO.findOneAndUpdate(
      {_id: new ObjectId(id)},
      {$inc: {applicationsCount: 1}},
      {returnDocument:'after'}
    )

    return result
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
