import Job from '../recruiter/job.entity';
import Recruiter from '../recruiter/recruiter.entity';

export default interface JobApplicationAggregated {
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
