//This recruiter is legacy, exist in some parts of the code. Will remove it after stabilizing
export default interface Recruiter {
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
  recruitingExperience?: string;
  focusingIndustries?: string[];
  isSuspended?: boolean;
  isDeleted?: boolean;
  profileStatus?: 'pending' | 'under-review' | 'approved' | 'rejected' | 'suspended' | 'closed';
  summary?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

/**This new recruiter will be the recruiter structure for the future */
export interface NewRecruiter {
  _id?: string;
  userId?: string;
  recruiterType?: 'self' | 'corporate';
  companyId?: string;
  fullName?: string;
  professionalTitle?: string;
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
  createdAt?: string;
  updatedAt?: string;
}
