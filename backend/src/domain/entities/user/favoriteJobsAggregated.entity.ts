import Company from '../company.entity';
import Job from '../recruiter/job.entity';
import { NewRecruiter } from '../recruiter/recruiter.entity';
import User from './User.FIX';

export default interface FavoriteJobsAggregated {
  _id?: string;
  candidateId?: string;
  jobId?: string;
  createdAt?: string;
  jobDetails: Job;
  postedBy: User;
  recruiterProfile: NewRecruiter
  companyDetails: Company
}
