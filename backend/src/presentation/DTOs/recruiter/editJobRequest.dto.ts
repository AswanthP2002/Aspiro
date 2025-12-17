import { JobType, WorkMode, SalaryPeriod, JobLevel } from "../../../domain/entities/recruiter/job.entity";

export default interface EditJobRequestDTO {
  recruiterId: string;
  jobTitle: string;
  description: string;
  requirements: string;
  responsibilities: string;
  duration?: string;
  jobType: JobType;
  workMode: WorkMode;
  location: string;
  minSalary: number;
  maxSalary: number;
  salaryCurrency: string;
  salaryPeriod: SalaryPeriod;
  vacancies: number;
  qualification: string;
  experienceInYears: number;
  jobLevel: JobLevel;
  requiredSkills: string[];
  optionalSkills: string[];
  expiresAt?: string;
}
