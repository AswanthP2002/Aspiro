import Candidate from '../user/candidates.LEGACY';
import Resume from '../user/resume.entity';

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
