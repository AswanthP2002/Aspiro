import Job from '../recruiter/job.entity';
import Recruiter from '../recruiter/recruiter.entity';
import User from './User.FIX';

export default interface FavoriteJobsAggregated {
  _id?: string;
  candidateId?: string;
  jobId?: string;
  createdAt?: string;
  jobDetails: Job;
  postedBy: User;
  recruiterProfile: Recruiter
}
