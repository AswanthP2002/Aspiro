import { SalaryPeriod } from '../../../domain/entities/recruiter/job.entity';

export interface LoadSavedJobsRequestDTO {
  candidateId: string;
  search: string;
  limit: number;
  page: number;
  sort: string;
}

export interface MySavedJobsDTO {
  _id?: string;
  createdAt?: string;
  jobDetails: {
    _id?: string;
    jobTitle: string;
    jobType?: string;
    workMode?: string;
    location?: string;
    minSalary: number;
    maxSalary: number;
    salaryCurrency: string; // e.g., 'USD', 'INR'
    salaryPeriod?: SalaryPeriod;
    vacancies: number;
    jobLevel?: string;
    requiredSkills: string[];
    applicationsCount?: number; // For analytics
    isFlagged?: boolean;
    expiresAt?: string;
  };
  recruiterDetails: {
    _id: string;
    name: string;
  };
  companyDetails: {
    _id: string;
    name: string;
  };
}

/**
 * export type JobApplicationStatus =
  | 'applied'
  | 'opened'
  | 'screening'
  | 'interview'
  | 'offer'
  | 'hired'
  | 'rejected';
  
export default interface JobApplication {
  _id?: string;
  candidateId?: string;
  jobId?: string;
  resumeId?: string;
  coverLetterContent: string;
  status?: JobApplicationStatus;
  notes?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

 */

/**
 * _id?: string;
   recruiterId?: string;
   companyId?: string; // Renamed from companyId for clarity
   jobTitle: string;
   description: string;
   requirements: string;
   responsibilities: string;
   duration?: string; // Good for contract/temporary roles
   jobType?: string;
   workMode?: string;
   location?: string;
   minSalary: number;
   maxSalary: number;
   salaryCurrency: string; // e.g., 'USD', 'INR'
   salaryPeriod?: SalaryPeriod;
   vacancies: number;
   qualification: string;
   experienceInYears: number; // More queryable than a string
   jobLevel?: string;
   reportsCount?: number;
   requiredSkills: string[];
   optionalSkills: string[];
   status?: JobStatus; // Replaces isBlocked and isRejected for better state management
   rejectionReason?: string; // To provide feedback if status is 'rejected'
   views?: number; // For analytics
   applicationsCount?: number; // For analytics
   isDeleted?: boolean;
   isArchived?: boolean;
   isFlagged?: boolean
   createdAt?: Date;
   updatedAt?: Date;
   expiresAt?: string;
 */
