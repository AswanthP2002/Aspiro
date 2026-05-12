import Job from '../job/job.entity';
import { NewRecruiter } from '../recruiter/recruiter.entity';

export default interface Company {
  _id?: string;
  name: string;
  slogan?: string;
  website?: string;
  linkedin?: string;
  description?: string;
  industry?: string;
  location?: string;
  logo?: {
    cloudinaryPublicId: string;
    cloudinarySecureUrl: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CompanyWithRecruitersAndJobs extends Company {
  jobs: Job[];
  recruiters: NewRecruiter[];
}
