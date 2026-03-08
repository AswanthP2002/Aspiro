import Company from '../company.entity';
import { JobStatus, SalaryPeriod } from '../recruiter/job.entity';
import { NewRecruiter } from '../recruiter/recruiter.entity';
import User from '../user/User.FIX';

export default interface JobListAggregatedForPublic {
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
  reportsCount?: number;
  requiredSkills: string[];
  optionalSkills: string[];
  status?: JobStatus; 
  rejectionReason?: string; 
  views?: number; 
  applicationsCount?: number; 
  isDeleted?: boolean;
  isArchived?: boolean;
  isFlagged?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  expiresAt?: string;
  userProfileDetails?: User
  recruiterProfileDetails?: NewRecruiter
  companyProfileDetails?: Company
}
