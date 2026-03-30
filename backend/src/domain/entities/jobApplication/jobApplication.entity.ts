import Company from '../company/company.entity';
import Job from '../job/job.entity';
import { NewRecruiter } from '../recruiter/recruiter.entity';

export type JobApplicationStatus =
  | 'applied'
  | 'opened'
  | 'screening'
  | 'interview'
  | 'offer'
  | 'hired'
  | 'rejected';

export default interface JobApplication {
  _id?: string;
  candidateId?: string;
  jobId?: string;
  resumeId?: string;
  coverLetterContent: string;
  status?: JobApplicationStatus;
  notes?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface JobApplicationCompanyRecruiterAggregated {
  _id?: string;
  candidateId?: string;
  jobId?: string;
  resumeId?: string;
  coverLetterContent: string;
  status?: JobApplicationStatus;
  notes?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  jobDetails?: Job;
  recruiterDetails?: NewRecruiter;
  companyDetails?: Company;
}
