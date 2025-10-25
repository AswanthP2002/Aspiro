import Candidate from '../../../domain/entities/user/candidates.LEGACY';
import Resume from '../../../domain/entities/user/resume.entity';
import Job from '../../../domain/entities/job.entity';
import Recruiter from '../../../domain/entities/recruiter/recruiter.entity';

export default interface ApplicationDetailsAggregatedDTO {
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
