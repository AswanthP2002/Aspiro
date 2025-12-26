import { Exclude, Expose } from 'class-transformer';
import Recruiter from '../../../domain/entities/recruiter/recruiter.entity';
import User from '../../../domain/entities/user/User.FIX';
import { JobAggregatedDTO } from '../user/jobAggregated.dto';

export default interface LoadJobDTO {
  search: string;
  page: number;
  limit: number;
  sort: string;
  filters: any;
  minSalary: string;
  maxSalary: string;
}
@Exclude()
export class LoadJobsResDto {
  @Expose()
  jobs!: JobAggregatedDTO[];

  @Expose()
  page!: number;

  @Expose()
  totalPages!: number;

  @Expose()
  currentSort!: string;
}

//legacy
export interface LoadJobResDTO {
  jobs: { userDetails: User; recruiterProfile: Recruiter }[];
  page: number;
  totalPages: number;
  currentSort: string;
}

export interface LoadJobRes {
  jobs: any;
  page: number;
  totalPages: number;
  currentSort: string;
}
