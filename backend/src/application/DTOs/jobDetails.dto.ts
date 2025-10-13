import Recruiter from '../../domain/entities/recruiter/recruiter.entity';

export default interface JobAggregatedDTO {
  _id?: string;
  companyId?: string;
  jobTitle: string;
  description: string;
  requirements: string;
  responsibilities: string;
  duration: string;
  jobType: string;
  locationType: string;
  location: string;
  minSalary: number;
  maxSalary: number;
  vacancies: number;
  qualification: string;
  experience: string;
  jobLevel: string;
  requiredSkills: string[];
  optionalSkills: string[];
  isBlocked?: boolean;
  isRejected?: boolean;
  createdAt?: string;
  updatedAt?: string;
  expiresAt: string;
  companyDetails: Recruiter;
}
