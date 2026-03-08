import { Exclude, Expose } from 'class-transformer';
import Follow from '../../../domain/entities/follow.entity';
import Job from '../../../domain/entities/recruiter/job.entity';
import Recruiter from '../../../domain/entities/recruiter/recruiter.entity';
import SocialLinks from '../../../domain/entities/SocialLinks';
import Certificates from '../../../domain/entities/user/certificates.entity';
import Education from '../../../domain/entities/user/educations.entity';
import Experience from '../../../domain/entities/user/experience.entity';
import Post from '../../../domain/entities/user/Post';
import Skills from '../../../domain/entities/user/skills.entity';
import { Role } from '../../../domain/entities/user/User.FIX';
import ConnectionRequest from '../../../domain/entities/user/connectionRequest.entity';

@Exclude()
export default class UserProfileAggregatedDTO {
  @Expose()
  _id!: string;

  @Expose()
  name!: string;

  @Expose()
  headline?: string;

  @Expose()
  summary?: string;

  password?: string;

  dateOfBirth?: string;

  @Expose()
  socialLinks?: SocialLinks[];

  @Expose()
  location?: {
    city: string;
    district: string;
    state: string;
    country: string;
    pincode: string;
  };

  @Expose()
  role?: Role[];

  @Expose()
  phone?: string;

  @Expose()
  email?: string;

  googleId?: string;
  facebookId?: string;
  linkedinId?: string;

  @Expose()
  profilePicture?: {
    cloudinaryPublicId: string;
    cloudinarySecureUrl: string;
  };

  @Expose()
  coverPhoto?: {
    cloudinaryPublicId: string;
    cloudinarySecureUrl: string;
  };

  isBlocked?: boolean;
  isVerified?: boolean;
  isAdmin?: boolean;
  isRecruiter?: boolean;

  @Expose()
  createdAt?: string;

  updatedAt?: string;

  verificationToken?: string;
  otpExpiresAt?: Date;

  @Expose()
  experiences!: Experience[];

  @Expose()
  educations!: Education[];

  @Expose()
  certificates!: Certificates[];

  @Expose()
  skills!: Skills[];

  @Expose()
  posts!: Post[];

  @Expose()
  recruiterProfile!: Recruiter;

  @Expose()
  jobs!: Job[];

  @Expose()
  followers!: Follow[];

  following!: Follow[];

  connections!: string[];
}

export interface UserPublicProfileDTO {
  _id: string;

  name: string;

  headline: string;

  summary: string;

  socialLinks?: SocialLinks[];

  location?: {
    city: string;
    district: string;
    state: string;
    country: string;
    pincode: string;
  };

  role?: Role[];

  email?: string;

  profilePicture?: {
    cloudinaryPublicId: string;
    cloudinarySecureUrl: string;
  };

  coverPhoto?: {
    cloudinaryPublicId: string;
    cloudinarySecureUrl: string;
  };

  isRecruiter?: boolean;

  createdAt?: string;

  updatedAt?: string;

  experiences: Experience[];

  educations: Education[];

  certificates: Certificates[];

  skills: Skills[];

  posts: Post[];

  recruiterProfile: Recruiter;

  jobs: Job[];

  followers: Follow[];

  following?: Follow[];

  connections: string[];

  connectionRequests?: ConnectionRequest[];
}

export interface AdminUserDetailsDTO {
  _id: string;
  name: string;
  summary: string;
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
  email?: string;
  profilePicture?: {
    cloudinaryPublicId: string;
    cloudinarySecureUrl: string;
  };
  isRecruiter?: boolean;
  isBanned?: boolean;
  isVerified?: boolean;
  isBlocked?: boolean;
  createdAt?: string;
  updatedAt?: string;
  experiences: Experience[];
  educations: Education[];
  skills: Skills[];
  posts: Post[];
  lastLogin?: string | Date;
}
