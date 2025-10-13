import Candidate from '../candidate/candidates.LEGACY';
import Resume from '../candidate/resume.entity';

export default interface ApplicationsAggregated {
  _id: string;
  candidateId: string;
  jobId: string;
  coverLetterContent: string;
  resumeId: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  applicantDetails: Candidate;
  resume: Resume;
}
