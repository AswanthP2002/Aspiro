import mongoose from 'mongoose';
import JobApplication from '../../domain/entities/user/jobApplication.entity';
import IJobApplicationRepo from '../../domain/interfaces/IJobApplicationRepo';
import BaseRepository from './baseRepository';
import { JobApplicationDAO } from '../database/DAOs/user/jobApplication.dao';
import JobApplicationAggregated from '../../domain/entities/user/jobApplicationAggregated.entity';
import ApplicationsAggregated from '../../domain/entities/recruiter/jobApplicationsAggregated.entity';
import { SingleJobApplicationDetailsAggregated } from '../../domain/entities/recruiter/jobApplicationDetailsAggregated.entity';

export default class JObApplicationRepository
  extends BaseRepository<JobApplication>
  implements IJobApplicationRepo
{
  constructor() {
    super(JobApplicationDAO);
  }

  async getApplicationsByJobId(
    jobId: string,
    search: string,
    page: number,
    limit: number,
    filter: string[]
  ): Promise<{
    applications: ApplicationsAggregated[];
    totalPages: number;
    totalDocs: number;
  } | null> {
    const skip = (page - 1) * limit;
    const result = await JobApplicationDAO.aggregate([
      {
        $match: {
          jobId: new mongoose.Types.ObjectId(jobId),
          status: { $in: filter },
        },
      },

      {
        $facet: {
          applications: [
            {
              $lookup: {
                from: 'jobs',
                localField: 'jobId',
                foreignField: '_id',
                as: 'job',
              },
            },
            { $unwind: { path: '$job', preserveNullAndEmptyArrays: true } },
            {
              $lookup: {
                from: 'users',
                localField: 'candidateId',
                foreignField: '_id',
                as: 'applicant',
              },
            },
            { $unwind: { path: '$applicant', preserveNullAndEmptyArrays: true } },
            {
              $lookup: {
                from: 'resumes',
                localField: 'resumeId',
                foreignField: '_id',
                as: 'resume',
              },
            },
            { $unwind: { path: '$resume', preserveNullAndEmptyArrays: true } },
            {
              $lookup: {
                from: 'experiences',
                localField: 'userId',
                foreignField: 'applicant.id',
                as: 'experiences',
              },
            },
            {
              $lookup: {
                from: 'educations',
                localField: 'userId',
                foreignField: 'applicant.id',
                as: 'educations',
              },
            },
            {
              $lookup: {
                from: 'skills',
                localField: 'userId',
                foreignField: 'applicant.id',
                as: 'skills',
              },
            },
            {
              $match: {
                $or: [
                  { 'applicant.name': { $regex: new RegExp(search, 'i') } },
                  { 'applicant.email': { $regex: new RegExp(search, 'i') } },
                ],
              },
            },
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: limit },
          ],
          metaData: [{ $count: 'totalDocs' }],
        },
      },
    ]);

    const applications = result[0]?.applications;
    const totalDocs = result[0]?.metaData[0]?.totalDocs;
    const totalPages = Math.ceil(totalDocs / limit);
    return { applications, totalDocs, totalPages };
  }

  async rejectJobApplication(applicationId: string): Promise<JobApplication | null> {
    const updateResult = await JobApplicationDAO.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(applicationId) },
      { $set: { status: 'rejected' } },
      { returnDocument: 'after' }
    );

    return updateResult;
  }

  async getCandidateSpecificApplications(
    candidateId: string,
    search: string,
    page: number,
    limit: number,
    status: string[],
    sort: { [key: string]: -1 | 1 }
  ): Promise<{
    applications: JobApplicationAggregated[];
    totalDocs: number;
    totalPages: number;
  } | null> {
    const skip = (page - 1) * limit;
    console.log('checking query valus inside repository')
    console.log('search', search)
    console.log('sort', sort)
    console.log('status', status)
    console.log('page', page)
    console.log('limit', limit)
    console.log('candidate id', candidateId)
    const result = await JobApplicationDAO.aggregate([
      {
        $match: { candidateId: new mongoose.Types.ObjectId(candidateId), status: { $in: status } },
      },
      {
        $facet: {
          applications: [
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
                from: 'users',
                localField: 'jobDetails.recruiterId',
                foreignField: '_id',
                as: 'recruiterUserProfile',
              },
            },
            { $unwind: '$recruiterUserProfile' },
            {
              $lookup: {
                from: 'recruiters',
                localField: 'recruiterUserProfile._id',
                foreignField: 'userId',
                as: 'recruiterProfile',
              },
            },
            { $unwind: '$recruiterProfile' },
            {
              $lookup: {
                from: 'companies',
                localField: 'recruiterProfile.companyId',
                foreignField: '_id',
                as: 'companyProfile',
              },
            },
            { $unwind: { path: '$companyProfile', preserveNullAndEmptyArrays: true } },
            { $match: { 'jobDetails.jobTitle': { $regex: new RegExp(search, 'i') } } },
            { $sort: sort },
            { $skip: skip },
            { $limit: limit },
          ],
          metaData: [{ $count: 'totalDocs' }],
        },
      },
    ]);
    const applications = result[0]?.applications;
    const totalDocs = result[0]?.metaData[0]?.totalDocs;
    const totalPages = Math.ceil(totalDocs / limit);

    console.log('checking applications', applications)
    console.log('checking totaldocs', totalDocs)
    console.log('checking totalpages', totalPages)

    return { applications, totalDocs, totalPages };
  }

  async getApplicationDetails(
    applicationId: string
  ): Promise<SingleJobApplicationDetailsAggregated | null> {
    const result = await JobApplicationDAO.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(applicationId) } },
      {
        $lookup: {
          from: 'resumes',
          localField: 'resumeId',
          foreignField: '_id',
          as: 'resume',
        },
      },
      { $unwind: { path: '$resume', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'users',
          localField: 'candidateId',
          foreignField: '_id',
          as: 'candidateDetails',
        },
      },
      { $unwind: { path: '$candidateDetails', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'experiences',
          localField: 'candidateId',
          foreignField: 'userId',
          as: 'experiences',
        },
      },
      {
        $lookup: {
          from: 'educations',
          localField: 'candidateId',
          foreignField: 'userId',
          as: 'educations',
        },
      },
      {
        $lookup: {
          from: 'skills',
          localField: 'candidateId',
          foreignField: 'userId',
          as: 'skills',
        },
      },
    ]);

    return result.length > 0 ? result[0] : null;
  }

  async getJobApplicationWithJobIdCandidateId(
    jobId: string,
    candidateId: string
  ): Promise<JobApplication | null> {
    if (!mongoose.isValidObjectId(jobId) || !mongoose.isValidObjectId(candidateId)) return null;

    const jobApplication = await JobApplicationDAO.findOne({
      jobId: new mongoose.Types.ObjectId(jobId),
      candidateId: new mongoose.Types.ObjectId(candidateId),
    });

    return jobApplication;
  }
}
