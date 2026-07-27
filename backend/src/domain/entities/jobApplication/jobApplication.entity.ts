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
  | 'rejected'
  | 'withdrawn';

export default interface JobApplication {
  _id?: string;
  candidateId?: string;
  jobId?: string;
  recruiterId?: string;
  companyId?: string;
  resumeId?: string;
  coverLetterContent: string;
  status?: JobApplicationStatus;
  notes?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  withdrawReason?: string;
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
