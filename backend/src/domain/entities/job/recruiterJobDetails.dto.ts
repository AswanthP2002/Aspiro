import { JobType, WorkMode, SalaryPeriod, JobLevel, JobStatus } from './job.entity';

export default interface RecruiterJobDetailsDTO {
  _id?: string;
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
  qualification: string;
  experienceInYears: number;
  jobLevel?: JobLevel;
  vacancies: number;
  requiredSkills: string[];
  optionalSkills: string[];
  status?: JobStatus;
  views?: number;
  applicationsCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
  expiresAt?: string;
}
