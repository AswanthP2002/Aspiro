import { Role } from '../../../domain/entities/user/User.FIX';
import SocialLinks from '../../../domain/entities/user/SocialLinks';
import { IsDefined, IsOptional, IsString } from 'class-validator';

export interface UpdataeUserDto {
  _id: string;
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
    coords?: {
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
  connections?: string[];
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

export default class UpdateUserDTO {
  @IsDefined()
  @IsString()
  _id!: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  headline?: string;

  @IsOptional()
  @IsString()
  summary?: string;

  @IsOptional()
  @IsString()
  dateOfBirth?: string;

  @IsOptional()
  socialLinks?: SocialLinks[];

  @IsOptional()
  location?: {
    city: string;
    district: string;
    state: string;
    country: string;
    pincode: string;
  };

  @IsOptional()
  role?: Role[];

  @IsOptional()
  phone?: string;

  @IsOptional()
  email?: string;

  @IsOptional()
  googleId?: string;

  @IsOptional()
  facebookId?: string;

  @IsOptional()
  linkedinId?: string;

  @IsOptional()
  profilePicture?: {
    cloudinaryPublicId: string;
    cloudinarySecureUrl: string;
  };

  @IsOptional()
  coverPhoto?: {
    cloudinaryPublicId: string;
    cloudinarySecureUrl: string;
  };

  @IsOptional()
  isBlocked?: boolean;

  @IsOptional()
  isVerified?: boolean;

  @IsOptional()
  isAdmin?: boolean;

  @IsOptional()
  isRecruiter?: boolean;
}
