import { Role } from '../../../domain/entities/user/User.FIX';
import SocialLinks from '../../../domain/entities/SocialLinks';
import { IsDefined, IsOptional, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';

export class UpdataeUserDto {
  @IsDefined({ message: 'Id can not be empty' })
  @IsString({ message: '_id must be string' })
  _id!: string;

  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  name!: string;

  @IsOptional()
  @IsString({ message: 'Headline must be a string' })
  headline?: string;

  @IsOptional()
  @IsString({ message: 'Summary must be a string' })
  summary?: string;

  @Exclude()
  password?: string;

  @IsOptional()
  dateOfBirth!: string;

  @IsOptional()
  socialLinks!: SocialLinks[];

  @IsOptional()
  location!: {
    city: string;
    district: string;
    state: string;
    country: string;
    pincode: string;
  };

  @IsOptional()
  role!: Role[];

  @IsOptional()
  phone!: string;

  @IsOptional()
  email!: string;

  @Exclude()
  googleId?: string;

  @Exclude()
  facebookId?: string;

  @Exclude()
  linkedinId?: string;

  @IsOptional()
  connections!: string[];

  @IsOptional()
  profilePicture!: {
    cloudinaryPublicId: string;
    cloudinarySecureUrl: string;
  };

  @IsOptional()
  coverPhoto!: {
    cloudinaryPublicId: string;
    cloudinarySecureUrl: string;
  };

  @IsOptional()
  isBlocked!: boolean;

  @IsOptional()
  isVerified?: boolean;

  @IsOptional()
  isAdmin?: boolean;

  @IsOptional()
  isRecruiter?: boolean;

  @Exclude()
  createdAt?: string;

  @Exclude()
  updatedAt?: string;

  @IsOptional()
  verificationToken?: string;

  @IsOptional()
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
