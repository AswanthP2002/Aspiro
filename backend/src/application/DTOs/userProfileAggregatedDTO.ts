import Follow from "../../domain/entities/follow.entity";
import Job from "../../domain/entities/recruiter/job.entity";
import Recruiter from "../../domain/entities/recruiter/recruiter.entity";
import SocialLinks from "../../domain/entities/SocialLinks";
import Certificates from "../../domain/entities/user/certificates.entity";
import Education from "../../domain/entities/user/educations.entity";
import Experience from "../../domain/entities/user/experience.entity";
import Post from "../../domain/entities/user/Post";
import Skills from "../../domain/entities/user/skills.entity";
import { Role } from "../../domain/entities/user/User.FIX";


export default interface UserProfileAggregatedDTO {
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
  isAdmin?: boolean;
  isRecruiter?: boolean;
  createdAt?: string;
  updatedAt?: string;
  verificationToken?: string;
  otpExpiresAt?: Date;
  experiences: Experience[];
  educations: Education[];
  certificates: Certificates[]
  skills: Skills[];
  posts: Post[];
  recruiterProfile:Recruiter
  jobs:Job[]
  followers: Follow[]
}
