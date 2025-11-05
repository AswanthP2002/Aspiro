import Job from '../../../domain/entities/recruiter/job.entity';
import Recruiter from '../../../domain/entities/recruiter/recruiter.entity';
import SocialLinks from '../../../domain/entities/SocialLinks';
import User from '../../../domain/entities/user/User';
import { Role } from '../user/createUser.dto';

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
