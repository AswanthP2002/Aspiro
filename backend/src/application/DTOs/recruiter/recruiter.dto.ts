import SocialLinks from '../../../domain/entities/socialLinks.entity';

export default interface CreateRecruiterDTO {
  name: string;
  userId: string;
}

export interface RecruiterDTO {
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
  teamStrength?: string;
  foundIn?: string;
  website?: string;
  vision?: string;
  about?: string;
  createdAt?: Date;
  updatedAt?: Date;
  currentSubscription?: string;
}

export interface UpdateRecriterDTO {
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
  teamStrength?: string;
  foundIn?: string;
  website?: string;
  vision?: string;
  about?: string;
}
