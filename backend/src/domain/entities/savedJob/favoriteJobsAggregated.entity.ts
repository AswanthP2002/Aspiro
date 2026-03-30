import Company from '../company/company.entity';
import Job from '../job/job.entity';
import { NewRecruiter } from '../recruiter/recruiter.entity';
import User from '../user/User.FIX';

export default interface FavoriteJobsAggregated {
  _id?: string;
  candidateId?: string;
  jobId?: string;
  createdAt?: string;
  jobDetails: Job;
  postedBy: User;
  recruiterProfile: NewRecruiter;
  companyDetails: Company;
}
