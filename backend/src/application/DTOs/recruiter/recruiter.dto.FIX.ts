import SocialLinks from '../../../domain/entities/user/SocialLinks';

export default interface CreateRecruiterDTO {
  userId?: string;
  recruiterType?: 'self' | 'corporate';
  companyId?: string;
  fullName?: string;
  professionalTitle?: string;
  email?: string;
  phone?: string;
  yearOfExperience?: string;
  linkedinUrl?: string;
  verificationDocumentFile: Buffer<ArrayBufferLike>;
  verificationDocumentFilePath?: string;
}

export interface RecruiterDTO {
  _id?: string;
  userId?: string;
  recruiterType?: 'self' | 'corporate';
  companyId?: string;
  fullName?: string;
  profiessionalTitle?: string;
  email?: string;
  phone?: string;
  yearOfExperience?: string;
  linkedinUrl?: string;
  verificationDocument?: {
    publicId?: string;
    url?: string;
  };
  isVerified?: boolean;
  isJobsHidden?: boolean;
  isPermissionRevoked?: boolean;
  profileStatus?: 'pending' | 'under-review' | 'approved' | 'rejected' | 'closed';
  isRejected?: boolean;
  rejection?: {
    reason?: string;
    feedback?: string;
  };
  verificationTimeline?: { action: string; actor: string; createdAt: string; updatedAt: string }[];
  applicationResendBufferDate?: Date;
  // verificationHistory?: any;
  createdAt?: string;
  updatedAt?: string;
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
