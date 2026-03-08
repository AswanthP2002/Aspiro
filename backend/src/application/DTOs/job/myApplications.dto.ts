import { JobApplicationStatus } from '../../../domain/entities/user/jobApplication.entity';

export interface LoadMyApplicationsDTO {
  candidateId: string;
  search: string;
  page: number;
  limit: number;
  status: string;
  sort: string;
}
export interface MyApplicationsListDTO {
  _id?: string;
  status?: JobApplicationStatus;
  createdAt?: string;
  updatedAt?: string;
  jobDetails?: {
    _id?: string;
    jobTitle?: string;
    minSalary?: number;
    jobType?: string;
    workMode?: string;
    jobLevel?: string;
  };
  recruiterDetails?: {
    _id?: string;
    name?: string;
  };
  companyDetails?: {
    _id?: string;
    name?: string;
  };
}
