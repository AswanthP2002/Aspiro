import Company from './company.entity';
import { JobLevel, JobStatus, JobType, SalaryPeriod, WorkMode } from './recruiter/job.entity';
import { NewRecruiter } from './recruiter/recruiter.entity';
import User from './user/User.FIX';

export default interface JobAggregated {
  _id?: string;
  recruiterId?: string; 
  jobTitle: string;
  description: string;
  requirements: string;
  responsibilities: string;
  duration?: string; 
  jobType?: JobType;
  workMode?: WorkMode;
  location: string;
  minSalary: number;
  maxSalary: number;
  salaryCurrency: string; 
  salaryPeriod?: SalaryPeriod;
  vacancies: number;
  qualification: string;
  experienceInYears: number; 
  jobLevel?: JobLevel;
  requiredSkills: string[];
  optionalSkills: string[];
  status?: JobStatus; 
  rejectionReason?: string; 
  views?: number; 
  applicationsCount?: number; 
  userProfile?: User;
  userRecruiterProfile?: NewRecruiter;
  companyProfileDetails?: Company
  candidateIds: string[];
  createdAt?: Date;
  updatedAt?: Date;
  expiresAt?: string;
}