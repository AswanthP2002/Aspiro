import { JobApplicationStatus } from '../../../domain/entities/jobApplication/jobApplication.entity';

export default interface CreateJobApplicationDTO {
  candidateId: string;
  jobId: string;
  resumeId: string;
  coverLetterContent: string;
}

export interface JobApplicationDTO {
  _id?: string;
  candidateId?: string;
  jobId?: string;
  resumeId?: string;
  coverLetterContent?: string;
  status?: JobApplicationStatus;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface JobApplicationTrackingDTO {
  _id?: string;
  status?: JobApplicationStatus;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
  jobDetails?: {
    _id: string;
    jobTitle: string;
  };
  recruiterDetails?: {
    _id: string;
    name: string;
  };
  companyDetails?: {
    _id: string;
    name: string;
  };
}
