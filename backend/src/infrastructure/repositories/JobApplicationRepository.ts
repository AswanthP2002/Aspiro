import mongoose from 'mongoose';
import JobApplication, {
  JobApplicationCompanyRecruiterAggregated,
} from '../../domain/entities/jobApplication/jobApplication.entity';
import IJobApplicationRepo from '../../domain/interfaces/IJobApplicationRepo';
import BaseRepository from './baseRepository';
import { JobApplicationDAO } from '../database/DAOs/user/jobApplication.dao';
import JobApplicationAggregated from '../../domain/entities/jobApplication/jobApplicationAggregated.entity';
import ApplicationsAggregated from '../../domain/entities/jobApplication/jobApplicationsAggregated.entity';
import { SingleJobApplicationDetailsAggregated } from '../../domain/entities/jobApplication/jobApplicationDetailsAggregated.entity';

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
    applied?: number;
    screening?: number;
    interview?: number;
    offer?: number;
    hired?: number;
    rejected?: number;
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
          appliedMetaData: [{ $match: { status: 'applied' } }, { $count: 'applied' }],
          screeningMetaData: [{ $match: { status: 'screening' } }, { $count: 'screening' }],
          interviewMetaData: [{ $match: { status: 'interview' } }, { $count: 'interview' }],
          offerMetaData: [{ $match: { status: 'offer' } }, { $count: 'offer' }],
          hiredMetaData: [{ $match: { status: 'hired' } }, { $count: 'hired' }],
          rejectedMetaData: [{ $match: { status: 'rejected' } }, { $count: 'rejected' }],
        },
      },
    ]);

    const applications = result[0]?.applications;
    const applied = result[0]?.appliedMetaData[0]?.applied || 0;
    const screening = result[0]?.screeningMetaData[0]?.screening || 0;
    const interview = result[0]?.interviewMetaData[0]?.interview || 0;
    const offer = result[0]?.offerMetaData[0]?.offer || 0;
    const hired = result[0]?.hiredMetaData[0]?.hired || 0;
    const rejected = result[0]?.rejectedMetaData[0]?.rejected || 0;
    const totalDocs = result[0]?.metaData[0]?.totalDocs;
    const totalPages = Math.ceil(totalDocs / limit);
    return {
      applications,
      totalDocs,
      totalPages,
      applied,
      screening,
      offer,
      hired,
      rejected,
      interview,
    };
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
    console.log('checking query valus inside repository');
    console.log('search', search);
    console.log('sort', sort);
    console.log('status', status);
    console.log('page', page);
    console.log('limit', limit);
    console.log('candidate id', candidateId);
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

    console.log('checking applications', applications);
    console.log('checking totaldocs', totalDocs);
    console.log('checking totalpages', totalPages);

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
      {
        $lookup: {
          from: 'jobs',
          localField: 'jobId',
          foreignField: '_id',
          as: 'jobDetails',
        },
      },
      { $unwind: { path: '$jobDetails', preserveNullAndEmptyArrays: true } },
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

  async getJobApplicationDetailsCompanyRecruiterCombined(
    applicationId: string
  ): Promise<JobApplicationCompanyRecruiterAggregated | null> {
    if (!mongoose.isValidObjectId(new mongoose.Types.ObjectId(applicationId))) return null;

    const result = await JobApplicationDAO.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(applicationId) } },
      {
        $lookup: {
          from: 'jobs',
          localField: 'jobId',
          foreignField: '_id',
          as: 'jobDetails',
        },
      },
      {
        $unwind: {
          path: '$jobDetails',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'jobDetails.recruiterId',
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
}
