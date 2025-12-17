import Job from '../../../domain/entities/recruiter/job.entity';
import Recruiter from '../../../domain/entities/recruiter/recruiter.entity';
import User from '../../../domain/entities/user/User.FIX';

export default interface JobApplicationAggregatedDTO {
  _id: string;
  coverLetterContent: string;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  candidateId: string;
  jobId: string;
  resumeId: string;
  jobDetails: Job;
  recruiterProfile: Recruiter;
  recruiterUserProfile: User
}
