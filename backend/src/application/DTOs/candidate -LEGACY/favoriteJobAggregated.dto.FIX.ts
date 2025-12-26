import { Exclude, Expose } from 'class-transformer';
import Job from '../../../domain/entities/recruiter/job.entity';
import Recruiter from '../../../domain/entities/recruiter/recruiter.entity';
import User from '../../../domain/entities/user/User.FIX';

@Exclude()
export default class FavoriteJobsAggregatedDTO {
  @Expose()
  _id!: string;

  @Expose()
  candidateId!: string;

  @Expose()
  jobId!: string;

  @Expose()
  createdAt!: string;

  @Expose()
  jobDetails!: Job;

  @Expose()
  postedBy!: User;

  @Expose()
  recruiterProfile!: Recruiter;
}
