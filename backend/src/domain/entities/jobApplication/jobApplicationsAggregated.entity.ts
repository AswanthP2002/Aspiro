import Education from '../education/educations.entity';
import Experience from '../experience/experience.entity';
import Resume from '../resume/resume.entity';
import Skills from '../skill.user/skills.entity';
import User from '../user/User.FIX';
import Job from '../job/job.entity';

export default interface ApplicationsAggregated {
  _id: string;
  candidateId: string;
  jobId: string;
  coverLetterContent: string;
  resumeId: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  notes?: string;
  job: Job;
  applicant: User;
  resume: Resume;
  experiences: Experience[];
  educations: Education[];
  skills: Skills;
}
