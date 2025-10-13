import Job from '../../../domain/entities/job.entity';
import SocialLinks from '../../../domain/entities/socialLinks.entity';

export default interface RecruiterProfileAggregated {
  _id?: string;
  userId?: string;
  name: string;
  employerType?: string;
  organizationDetails?: {
    organizationName: string;
    organizationType: string;
    industry: string;
    logo?: {
      cloudinaryPublicId: string;
      cloudinarySecureUrl: string;
    };
    location?: {
      city: string;
      country: string;
      state: string;
      pinCode: string;
    };
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
  location?: {
    city: string;
    country: string;
    state: string;
    pinCode: string;
  };
  socialLinks?: SocialLinks[];
  about?: string;
  createdAt?: Date;
  updatedAt?: Date;
  currentSubscription?: string;
}

export interface RecruiterProfileAggregatedDTO {
  _id?: string;
  userId?: string;
  name: string;
  employerType?: string;
  organizationDetails?: {
    organizationName: string;
    organizationType: string;
    industry: string;
    logo?: {
      cloudinaryPublicId: string;
      cloudinarySecureUrl: string;
    };
    location?: {
      city: string;
      country: string;
      state: string;
      pinCode: string;
    };
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
  location?: {
    city: string;
    country: string;
    state: string;
    pinCode: string;
  };
  socialLinks?: SocialLinks[];
  about?: string;
  createdAt?: Date;
  updatedAt?: Date;
  currentSubscription?: string;
}
