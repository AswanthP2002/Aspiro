import SocialLinks from '../../../domain/entities/SocialLinks';

export default interface CreateRecruiterDTO {
  userId?: string;
  employerType?: string;
  organizationDetails?: {
    organizationName?: string;
    organizationType?: string;
    industry?: string;
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
}



export interface RecruiterDTO {
  _id?: string;
  userId?: string;
  employerType?: string;
  organizationDetails?: {
    organizationName?: string;
    organizationType?: string;
    industry?: string;
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
  socialLinks?: SocialLinks[];
  createdAt?: Date;
  updatedAt?: Date;
  currentSubscription?: string;
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
    benefit?: String;
  };
  socialLinks?: SocialLinks[];
  createdAt?: Date;
  updatedAt?: Date;
}
