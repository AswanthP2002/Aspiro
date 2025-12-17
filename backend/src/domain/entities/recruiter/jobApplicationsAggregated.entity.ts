import Education from '../user/educations.entity';
import Experience from '../user/experience.entity';
import Resume from '../user/resume.entity';
import Skills from '../user/skills.entity';
import User from '../user/User.FIX';
import Job from './job.entity';

export default interface ApplicationsAggregated {
  _id: string;
  candidateId: string;
  jobId: string;
  coverLetterContent: string;
  resumeId: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  notes?: string
  job: Job
  applicant: User;
  resume: Resume;
  experiences: Experience[]
  educations: Education[]
  skills: Skills
}
