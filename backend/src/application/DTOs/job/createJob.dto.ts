import {
  JobLevel,
  JobStatus,
  JobType,
  WorkMode,
  SalaryPeriod,
} from '../../../domain/entities/job/job.entity';

export default interface CreateJobDTO {
  _id?: string;
  recruiterId?: string; // Renamed from companyId for clarity
  jobTitle: string;
  description: string;
  requirements: string;
  responsibilities: string;
  duration?: string; // Good for contract/temporary roles
  jobType?: string;
  workMode?: string;
  location: string;
  minSalary: number;
  maxSalary: number;
  salaryCurrency: string; // e.g., 'USD', 'INR'
  salaryPeriod?: SalaryPeriod;
  vacancies: number;
  qualification: string;
  experienceInYears: number; // More queryable than a string
  jobLevel: string;
  requiredSkills: string[];
  optionalSkills: string[];
  status?: JobStatus; // Replaces isBlocked and isRejected for better state management
  rejectionReason?: string; // To provide feedback if status is 'rejected'
  views?: number; // For analytics
  applicationsCount?: number; // For analytics
  createdAt?: Date;
  updatedAt?: Date;
  expiresAt?: string;
}

export interface JobDTO {
  _id?: string;
  recruiterId?: string; // Renamed from companyId for clarity
  jobTitle: string;
  description: string;
  requirements: string;
  responsibilities: string;
  duration?: string; // Good for contract/temporary roles
  jobType?: string;
  workMode?: string;
  location: string;
  minSalary: number;
  maxSalary: number;
  salaryCurrency: string; // e.g., 'USD', 'INR'
  salaryPeriod?: SalaryPeriod;
  vacancies: number;
  qualification: string;
  experienceInYears: number; // More queryable than a string
  jobLevel?: string;
  requiredSkills: string[];
  optionalSkills: string[];
  status?: JobStatus; // Replaces isBlocked and isRejected for better state management
  rejectionReason?: string; // To provide feedback if status is 'rejected'
  views?: number; // For analytics
  applicationsCount?: number; // For analytics
  createdAt?: Date;
  updatedAt?: Date;
  expiresAt?: string;
}

export interface EditJobDTO {
  _id?: string;
  recruiterId?: string; // Renamed from companyId for clarity
  jobTitle: string;
  description: string;
  requirements: string;
  responsibilities: string;
  duration?: string; // Good for contract/temporary roles
  jobType?: JobType;
  workMode?: WorkMode;
  location: string;
  minSalary: number;
  maxSalary: number;
  salaryCurrency: string; // e.g., 'USD', 'INR'
  salaryPeriod?: SalaryPeriod;
  vacancies: number;
  qualification: string;
  experienceInYears: number; // More queryable than a string
  jobLevel?: JobLevel;
  requiredSkills: string[];
  optionalSkills: string[];
  status?: JobStatus; // Replaces isBlocked and isRejected for better state management
  rejectionReason?: string; // To provide feedback if status is 'rejected'
  views?: number; // For analytics
  applicationsCount?: number; // For analytics
  createdAt?: Date;
  updatedAt?: Date;
  expiresAt?: string;
}

/**
 * search: string,
    page: number,
    limit: number,
    sortOption: string,
    filter:{
        status: string,
        workMode: string,
        jobType: string,
        jobLevel: string,
        minSalary?: number,
        maxSalary?: number
    }
 */
