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
