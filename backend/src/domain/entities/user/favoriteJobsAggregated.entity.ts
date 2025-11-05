import Job from '../recruiter/job.entity';

export default interface FavoriteJobsAggregated {
  _id?: string;
  candidateId?: string;
  jobId?: string;
  createdAt?: string;
  jobDetails: Job;
}
