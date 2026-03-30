import Follow from '../follow/follow.entity';
import Job from '../job/job.entity';
import { NewRecruiter } from '../recruiter/recruiter.entity';
import SocialLinks from './SocialLinks';
import Certificates from '../certificate/certificates.entity';
import ConnectionRequest from '../connection/connectionRequest.entity';
import Education from '../education/educations.entity';
import Experience from '../experience/experience.entity';
import Post from '../post/Post';
import Skills from '../skill.user/skills.entity';
import { AccountAction, Role } from './User.FIX';

export default interface UserProfileAggregated {
  _id?: string;
  name?: string;
  headline?: string;
  summary?: string;
  password?: string;
  dateOfBirth?: string;
  socialLinks?: SocialLinks[];
  location?: {
    city: string;
    district: string;
    state: string;
    country: string;
    pincode: string;
    coords: {
      type: 'Point';
      coordinates: [number, number];
    };
  };
  role?: Role[];
  phone?: string;
  email?: string;
  googleId?: string;
  facebookId?: string;
  linkedinId?: string;
  profilePicture?: {
    cloudinaryPublicId: string;
    cloudinarySecureUrl: string;
  };
  coverPhoto?: {
    cloudinaryPublicId: string;
    cloudinarySecureUrl: string;
  };
  isBlocked?: boolean;
  isVerified?: boolean;
  isBanned?: boolean;
  isAdmin?: boolean;
  isRecruiter?: boolean;
  createdAt?: string;
  updatedAt?: string;
  lastLogin?: string | Date;
  verificationToken?: string;
  otpExpiresAt?: Date;
  accountActions?: AccountAction[];
  connections?: string[];
  experiences: Experience[];
  educations: Education[];
  certificates: Certificates[];
  skills: Skills[];
  posts: Post[];
  recruiterProfile: NewRecruiter;
  jobs: Job[];
  followers: Follow[];
  following: Follow[];
  connectionRequests?: ConnectionRequest[];
}
