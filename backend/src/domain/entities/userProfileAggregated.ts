import Follow from './follow.entity';
import Job from './recruiter/job.entity';
import Recruiter from './recruiter/recruiter.entity';
import SocialLinks from './SocialLinks';
import Certificates from './user/certificates.entity';
import ConnectionRequest from './user/connectionRequest.entity';
import Education from './user/educations.entity';
import Experience from './user/experience.entity';
import Post from './user/Post';
import Skills from './user/skills.entity';
import { Role } from './user/User.FIX';

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
  connections?: string[];
  experiences: Experience[];
  educations: Education[];
  certificates: Certificates[];
  skills: Skills[];
  posts: Post[];
  recruiterProfile: Recruiter;
  jobs: Job[];
  followers: Follow[];
  connectionRequests?: ConnectionRequest[];
}
