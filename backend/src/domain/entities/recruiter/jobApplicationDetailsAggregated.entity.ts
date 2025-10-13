import Candidate from '../candidate/candidates.LEGACY';
import Resume from '../candidate/resume.entity';
import Job from '../job.entity';
import Recruiter from './recruiter.entity';

export default interface ApplicationDetailsAggregated {
  _id: string;
  candidateId: string;
  jobId: string;
  coverLetterContent: string;
  resumeId: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  candidateDetails: Candidate;
  resumeDetails: Resume;
  jobDetails: Job;
  companyDetails: Recruiter;
}
