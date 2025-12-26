import { IsDefined, IsOptional, IsString } from 'class-validator';
import SocialLinks from '../../../domain/entities/SocialLinks';
import { Exclude, Expose } from 'class-transformer';

export default class CreateRecruiterDTO {
  @IsDefined()
  @IsString()
  userId!: string;

  @IsDefined()
  @IsString()
  employerType!: string;

  @IsOptional()
  organizationDetails?: {
    organizationName?: string;
    organizationType?: string;
    industry?: string;
    organizationContactNumber?: string;
    organizationEmail?: string;
    linkedinUrl?: string;
    teamStrength?: string;
    website?: string;
  };

  @IsDefined()
  @IsString()
  summary?: string;

  @IsDefined()
  focusingIndustries?: string[];

  @IsDefined()
  @IsString()
  recruitingExperience!: string;
}

/**
_id?: string;
  userId?: string;
  employerType?: string;
  organizationDetails?: {
    organizationName?: string;
    organizationType?: string;
    industry?: string;
    organizationContactNumber?: string;
    organizationEmail?: string;
    linkedinUrl?: string
    teamStrength?: string;
    website?: string;
  };
  recruitingExperience?: string
  focusingIndustries?:string[]
  profileStatus?: 'pending' | 'approved' | 'rejected'
  summary?: string;
  createdAt?: Date;
  updatedAt?: Date;
 */

@Exclude()
export class RecruiterDTO {
  @Expose()
  _id!: string;

  @Expose()
  userId?: string;

  @Expose()
  employerType?: string;

  @Expose()
  organizationDetails?: {
    organizationName?: string;
    organizationType?: string;
    industry?: string;
    organizationContactNumber?: string;
    organizationEmail?: string;
    linkedinUrl?: string;
    teamStrength?: string;
    website?: string;
  };

  @Expose()
  recruiterExperience?: string;

  @Expose()
  focusingIndustries?: string[];

  @Expose()
  profileStatus?: 'pending' | 'approved' | 'rejected';

  @Expose()
  summary?: string;

  @Expose()
  createdAt?: Date;

  @Expose()
  isDeleted?: boolean;

  @Expose()
  isSuspended?: boolean;

  @Expose()
  updatedAt?: Date;
}

export interface UpdateRecriterDTO {
  _id?: string;
  userId?: string;
  employerType?: string;
  organizationDetails?: {
    organizationName: string;
    organizationType: string;
    industry: string;
    organizationContactNumber?: string;
    organizationEmail?: string;
    socialLinks?: SocialLinks[];
    teamStrength?: string;
    aboutCompany?: string;
    foundIn?: string;
    website?: string;
    vision?: string;
    benefit?: string;
  };
  isDeleted?: boolean;
  isSuspended?: boolean;
  socialLinks?: SocialLinks[];
  createdAt?: Date;
  updatedAt?: Date;
}

// Stoped at account suspension
