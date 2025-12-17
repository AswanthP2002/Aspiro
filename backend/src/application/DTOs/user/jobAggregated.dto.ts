import { JobType, WorkMode, SalaryPeriod, JobLevel, JobStatus } from "../../../domain/entities/recruiter/job.entity";
import Recruiter from "../../../domain/entities/recruiter/recruiter.entity";
import User from "../../../domain/entities/user/User.FIX";

export interface JobAggregatedDTO {
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
  createdAt?: Date;
  updatedAt?: Date;
  expiresAt?: String;
  userProfile:User;
  userRecruiterProfile:Recruiter
}