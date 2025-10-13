import Job from '../../../domain/entities/job.entity';

export default interface FavoriteJobsAggregatedDTO {
  _id?: string;
  candidateId?: string;
  jobId?: string;
  createdAt?: string;
  jobDetails: Job;
}
