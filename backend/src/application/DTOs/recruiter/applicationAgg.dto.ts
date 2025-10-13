import Candidate from '../../../domain/entities/candidate/candidates.LEGACY';
import Resume from '../../../domain/entities/candidate/resume.entity';

export default interface ApplicationsAggregatedDTO {
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
