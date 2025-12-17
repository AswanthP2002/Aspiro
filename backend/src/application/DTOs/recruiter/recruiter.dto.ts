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
    linkedinUrl?: string
    teamStrength?: string;
    website?: string;
  };
  summary?: string
  focusingIndustries?:string[]
  recruitingExperience?: string
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
    linkedinUrl?: string;
    teamStrength?: string;
    website?: string;
  };
  recruiterExperience?: string;
  focusingIndustries?: string[];
  profileStatus?: 'pending' | 'approved' | 'rejected';
  summary?: string;
  createdAt?: Date;
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
    benefit?: String;
  };
  socialLinks?: SocialLinks[];
  createdAt?: Date;
  updatedAt?: Date;
}
