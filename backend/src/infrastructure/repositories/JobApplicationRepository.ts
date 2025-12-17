import mongoose from 'mongoose';
import JobApplication from '../../domain/entities/user/jobApplication.entity';
import IJobApplicationRepo from '../../domain/interfaces/IJobApplicationRepo';
import BaseRepository from './baseRepository';
import { JobApplicationDAO } from '../database/DAOs/user/jobApplication.dao';
import JobApplicationAggregated from '../../domain/entities/user/jobApplicationAggregated.entity';
import ApplicationsAggregated from '../../domain/entities/recruiter/jobApplicationsAggregated.entity';
import ApplicationDetailsAggregated from '../../domain/entities/recruiter/jobApplicationDetailsAggregated.entity';

export default class JObApplicationRepository
  extends BaseRepository<JobApplication>
  implements IJobApplicationRepo
{
  constructor() {
    super(JobApplicationDAO);
  }

  // async saveJobApplication(jobApplication: JobApplication): Promise<boolean> {
  //     const db = await connectDb()

  //     const result = await db.collection<JobApplication>(this._collection).insertOne(jobApplication)
  //     return result.acknowledged
  // }

  async getApplicationsByJobId(
    jobId: string
  ): Promise<ApplicationsAggregated[] | null> {
    const result = await JobApplicationDAO.aggregate([
      { $match: { jobId: new mongoose.Types.ObjectId(jobId) } },
      {
    $lookup: {
      from: "jobs",
      localField: "jobId",
      foreignField: "_id",
      as: "job"
    }
  },
  {$unwind:'$job'},
  {$lookup: {
    from: 'users',
    localField: 'candidateId',
    foreignField: '_id',
    as: 'applicant'
  }},
  {$unwind:'$applicant'},
  {$lookup: {
    from: 'resumes',
    localField: 'resumeId',
    foreignField: '_id',
    as: 'resume'
  }},
  {$unwind:'$resume'},
  {$lookup:{
    from:'experiences',
    localField:'userId',
    foreignField:'applicant.id',
    as:'experiences'
  }},
  {$lookup: {
    from: 'educations',
    localField: 'userId',
    foreignField: 'applicant.id',
    as: 'educations'
  }},
  {$lookup:{
    from:'skills',
    localField:'userId',
    foreignField:'applicant.id',
    as:'skills'
  }}
    ]);
    return result;
  }

  async rejectJobApplication(
    applicationId: string
  ): Promise<JobApplication | null> {
    const updateResult = await JobApplicationDAO.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(applicationId) },
      { $set: { status: 'rejected' } },
      { returnDocument: 'after' }
    );

    return updateResult;
  }

  async getCandidateSpecificApplications(
    candidateId: string
  ): Promise<JobApplicationAggregated[] | null> {
    console.log('id int he rep', candidateId);
    const applications = await JobApplicationDAO.aggregate([
      { $match: { candidateId: new mongoose.Types.ObjectId(candidateId) } },
      {$lookup: {
    from: 'jobs',
    localField: 'jobId',
    foreignField: '_id',
    as: 'jobDetails'
  }},
  {$unwind:'$jobDetails'},
  {$lookup: {
    from: 'users',
    localField: 'jobDetails.recruiterId',
    foreignField: '_id',
    as: 'recruiterUserProfile'
  }},
  {$unwind:'$recruiterUserProfile'},
  {$lookup: {
    from: 'recruiters',
    localField: 'recruiterUserProfile._id',
    foreignField: 'userId',
    as: 'recruiterProfile'
  }},
  {$unwind:'$recruiterProfile'},
      { $sort: { createdAt: -1 } },
    ]);
    console.log('applications before sending', applications);
    return applications;
  }

  async getApplicationDetails(
    applicationId: string
  ): Promise<ApplicationDetailsAggregated | null> {
    const result = await JobApplicationDAO.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(applicationId) } },
      {
        $lookup: {
          from: 'resumes',
          localField: 'resumeId',
          foreignField: '_id',
          as: 'resumeDetails',
        },
      },
      { $unwind: '$resumeDetails' },
      {
        $lookup: {
          from: 'candidates',
          localField: 'candidateId',
          foreignField: '_id',
          as: 'candidateDetails',
        },
      },
      { $unwind: '$candidateDetails' },
      {
        $lookup: {
          from: 'jobs',
          localField: 'jobId',
          foreignField: '_id',
          as: 'jobDetails',
        },
      },
      { $unwind: '$jobDetails' },
      {
        $lookup: {
          from: 'recruiters',
          localField: 'jobDetails.companyId',
          foreignField: '_id',
          as: 'companyDetails',
        },
      },
      { $unwind: '$companyDetails' },
    ]);

    return result[0];
  }
}
