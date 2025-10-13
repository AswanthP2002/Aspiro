import Job from '../../../domain/entities/job.entity';
import Recruiter from '../../../domain/entities/recruiter/recruiter.entity';

export default interface JobApplicationAggregatedDTO {
  _id: string;
  coverLetterContent: string;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  candidateId: string;
  jobId: string;
  resumeId: string;
  jobDetails: Job;
  companyDetails: Recruiter;
}
