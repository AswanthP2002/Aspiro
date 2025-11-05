import Job from './job.entity';
import Recruiter from './recruiter.entity';
import SocialLinks from '../SocialLinks';
import User, { Role } from '../user/User';

export default interface RecruiterProfileOverviewData {
  _id?: string;
  userId?: string;
  employerType?: string;
  organizationDetails?: {
    organizationName?: string;
    organizationType?: string;
    industry?: string;
    organizationContactNumber?: string;
    organizationEmail?: string;
    socialLinks?: SocialLinks[];
    teamStrength?: string;
    aboutCompany?: string;
    foundIn?: string;
    website?: string;
    vision?: string;
    benefit?: String;
  };
  socialLinks?: SocialLinks[];
  createdAt?: Date;
  updatedAt?: Date;
  currentSubscription?: string;
  userProfile: User;
  jobs: Job[];
}
