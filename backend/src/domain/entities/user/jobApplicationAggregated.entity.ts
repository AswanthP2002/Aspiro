import Company from '../company.entity';
import Job from '../recruiter/job.entity';
import { NewRecruiter } from '../recruiter/recruiter.entity';
import User from './User.FIX';

export default interface JobApplicationAggregated {
  _id: string;
  coverLetterContent: string;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  candidateId: string;
  jobId: string;
  resumeId: string;
  jobDetails: Job;
  recruiterUserProfile: User;
  recruiterProfile: NewRecruiter;
  companyProfile?: Company
}
