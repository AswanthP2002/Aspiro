import Job from '../../../domain/entities/recruiter/job.entity';

export default interface FavoriteJobsAggregatedDTO {
  _id?: string;
  candidateId?: string;
  jobId?: string;
  createdAt?: string;
  jobDetails: Job;
}
