import Candidate from '../user/candidates..GARBAGE';
import Education from '../user/educations.entity';
import Experience from '../user/experience.entity';
import { JobApplicationStatus } from '../user/jobApplication.entity';
import Resume from '../user/resume.entity';
import Skills from '../user/skills.entity';
import User from '../user/User.FIX';
import Job from './job.entity';
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

export interface SingleJobApplicationDetailsAggregated {
  _id?: string;
  candidateId?: string;
  jobId?: string;
  resumeId?: string;
  coverLetterContent: string;
  status?: JobApplicationStatus;
  notes?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  candidateDetails?: User,
  experiences?: Experience[],
  educations?: Education[],
  resume?: Resume;
  skills?: Skills[]
}
