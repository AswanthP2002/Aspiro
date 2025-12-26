import { Exclude, Expose } from 'class-transformer';
import {
  JobType,
  WorkMode,
  SalaryPeriod,
  JobLevel,
  JobStatus,
} from '../../../domain/entities/recruiter/job.entity';
import Recruiter from '../../../domain/entities/recruiter/recruiter.entity';
import User from '../../../domain/entities/user/User.FIX';

@Exclude()
export class JobAggregatedDTO {
  @Expose()
  _id!: string;

  @Expose()
  recruiterId!: string;

  @Expose()
  jobTitle!: string;

  @Expose()
  description!: string;

  @Expose()
  requirements!: string;

  @Expose()
  responsibilities!: string;

  @Expose()
  duration!: string;

  @Expose()
  jobType!: JobType;

  @Expose()
  workMode!: WorkMode;

  @Expose()
  location!: string;

  @Expose()
  minSalary!: number;

  @Expose()
  maxSalary!: number;

  @Expose()
  salaryCurrency!: string;

  @Expose()
  salaryPeriod!: SalaryPeriod;

  @Expose()
  vacancies!: number;

  @Expose()
  qualification!: string;

  @Expose()
  experienceInYears!: number;

  @Expose()
  jobLevel!: JobLevel;

  @Expose()
  requiredSkills!: string[];

  @Expose()
  optionalSkills!: string[];

  @Expose()
  status!: JobStatus;

  @Expose()
  rejectionReason!: string;

  @Expose()
  views!: number;

  @Expose()
  applicationsCount!: number;

  @Expose()
  createdAt!: Date;

  @Expose()
  updatedAt!: Date;

  @Expose()
  expiresAt!: string;

  @Expose()
  userProfile!: User;

  @Expose()
  userRecruiterProfile!: Recruiter;
}
