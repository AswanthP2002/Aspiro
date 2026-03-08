export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Temporary';
export type WorkMode = 'On-site' | 'Remote' | 'Hybrid';
export type JobLevel = 'Entry-level' | 'Mid-level' | 'Senior-level' | 'Lead' | 'Manager';
export type SalaryPeriod = 'annually' | 'monthly' | 'weekly' | 'hourly';
export type JobStatus =
  | 'draft'
  | 'active'
  | 'expired'
  | 'closed'
  | 'rejected'
  | 'blocked'
  | 'flaged';

export default interface Job {
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
  isFlagged?: boolean
  createdAt?: Date;
  updatedAt?: Date;
  expiresAt?: string;
}
