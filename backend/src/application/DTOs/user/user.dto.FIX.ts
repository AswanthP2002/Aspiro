import { Role } from '../../../domain/entities/user/User.FIX';
import SocialLinks from '../../../domain/entities/SocialLinks';
import { Expose, Exclude } from 'class-transformer';

@Exclude()
export class UserDto {
  @Expose()
  _id!: string;

  @Expose()
  name!: string;

  @Expose()
  headline!: string;

  @Expose()
  summary!: string;

  password?: string;

  @Expose()
  dateOfBirth?: string;

  @Expose()
  socialLinks!: SocialLinks[];

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

  @Expose()
  connections?: string[];

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

  @Expose()
  isBlocked?: boolean;

  @Expose()
  isVerified?: boolean;

  @Expose()
  isAdmin?: boolean;

  @Expose()
  isRecruiter?: boolean;

  @Expose()
  createdAt?: string;
  updatedAt?: string;

  verificationToken?: string;
  otpExpiresAt?: Date;
}

//legacy - all this interface replaced with class,
// keep this until all of its imports replaced with class
export default interface UserDTO {
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
  connections?: string[];
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
}
