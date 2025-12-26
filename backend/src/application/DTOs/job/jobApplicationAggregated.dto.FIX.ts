import { Exclude, Expose } from 'class-transformer';
import Job from '../../../domain/entities/recruiter/job.entity';
import Recruiter from '../../../domain/entities/recruiter/recruiter.entity';
import User from '../../../domain/entities/user/User.FIX';

@Exclude()
export default class JobApplicationAggregatedDTO {
  @Expose()
  _id!: string;

  @Expose()
  coverLetterContent!: string;

  @Expose()
  createdAt!: Date;

  @Expose()
  updatedAt!: Date;

  @Expose()
  status!: string;

  @Expose()
  candidateId!: string;

  @Expose()
  jobId!: string;

  @Expose()
  resumeId!: string;

  @Expose()
  jobDetails!: Job;

  @Expose()
  recruiterProfile!: Recruiter;

  @Expose()
  recruiterUserProfile!: User;
}
