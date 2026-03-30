import { JobType, WorkMode, SalaryPeriod, JobLevel, JobStatus } from './job.entity';
import Recruiter from '../recruiter/recruiter.entity';
import User from '../user/User.FIX';

export default interface JobAggregatedData {
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
  expiresAt?: string;
  userProfile: User;
  userRecruiterProfile: Recruiter;
}
