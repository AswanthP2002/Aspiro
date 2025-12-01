import Job from '../../../domain/entities/recruiter/job.entity';
import User from '../../../domain/entities/user/User';

export default interface RecruiterProfilelOverviewDataDTO {
  _id?: string;
  userId?: string;
  employerType?: string;
  organizationDetails?: {
    organizationName?: string;
    organizationType?: string;
    industry?: string;
    organizationContactNumber?: string;
    organizationEmail?: string;
    teamStrength?: string;
    website?: string;

  };
  recruitingExperience?: string
  focusingIndustries?:string[]
  profileStatus?: 'pending' | 'approved' | 'rejected'
  summary?: string;
  createdAt?: Date;
  updatedAt?: Date;
  userProfile: User;
  jobs: Job[];
}
