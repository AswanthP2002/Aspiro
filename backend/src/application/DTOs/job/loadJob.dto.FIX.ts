import { JobStatus, SalaryPeriod } from '../../../domain/entities/job/job.entity';
import Recruiter from '../../../domain/entities/recruiter/recruiter.entity';
import User from '../../../domain/entities/user/User.FIX';
import { JobAggregatedDTO } from './jobAggregated.dto';

export interface LoadJobListForPublicDTO {
  search: string;
  locationSearch: string;
  limit: number;
  page: number;
  workModeFilter: string;
  jobTypeFilter: string;
  jobLevelFilter: string;
}

export interface AdminLoadJobsDTO {
  search: string;
  page: number;
  limit: number;
  reportsCount?: number;
  statusFilter?: string;
  jobTypeFilter?: string;
}
export interface LoadJobsResDto {
  jobs: JobAggregatedDTO[];
  page: number;
  totalPages?: number;
  currentSort?: string;
}

//legacy
export interface LoadJobResDTO {
  jobs: { userDetails: User; recruiterProfile: Recruiter }[];
  page: number;
  totalPages: number;
  currentSort: string;
}

export interface MyJobDTO {
  _id?: string;
  jobTitle: string;
  jobType?: string;
  workMode?: string;
  location?: string;
  jobLevel?: string;
  status?: JobStatus;
  views?: number;
  applicationsCount?: number;
  isDeleted?: boolean;
  isArchived?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  expiresAt?: string;
}

export interface AdminJobsListDTO {
  _id?: string;
  jobTitle: string;
  jobType?: string;
  workMode?: string;
  jobLevel?: string;
  reportsCount?: number;
  status?: JobStatus;
  isDeleted?: boolean;
  isArchived?: boolean;
  isFlagged?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  expiresAt?: string;
  companyName?: string;
  recruiterName?: string;
}

export interface JobListForPublicDTO {
  _id?: string;
  recruiterId?: string;
  companyId?: string;
  jobTitle: string;
  duration?: string;
  jobType?: string;
  workMode?: string;
  location?: string;
  minSalary: number;
  maxSalary: number;
  salaryCurrency: string;
  salaryPeriod?: SalaryPeriod;
  experience?: string;
  jobLevel?: string;
  requiredSkills: string[];
  createdAt?: Date;
  updatedAt?: Date;
  expiresAt?: string;
  companyDetails?: {
    _id?: string;
    name?: string;
  };
  recruiterDetail?: {
    _id?: string;
    recruiterType?: string;
    name?: string;
    isFlagged?: boolean;
    isVerified?: boolean;
  };
}

export interface LoadJobDetailsDTOForPublic {
  _id?: string;
  recruiterId?: string;
  companyId?: string;
  jobTitle: string;
  description: string;
  requirements: string;
  responsibilities: string;
  duration?: string;
  jobType?: string;
  workMode?: string;
  location?: string;
  minSalary: number;
  maxSalary: number;
  salaryCurrency: string;
  salaryPeriod?: SalaryPeriod;
  vacancies: number;
  qualification: string;
  experienceInYears: number;
  jobLevel?: string;
  requiredSkills: string[];
  optionalSkills: string[];
  applicationsCount?: number;
  isFlagged?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  expiresAt?: string;
  recruiterProfileDetails?: {
    _id: string;
    name: string;
    recruiterType: string;
    professionalTitle: string;
    isVerifiedRecruiter?: boolean;
  };
  companyProfileDetails?: {
    _id: string;
    name: string;
  };
}
