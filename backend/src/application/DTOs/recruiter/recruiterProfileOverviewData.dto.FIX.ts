import Job from '../../../domain/entities/recruiter/job.entity';
import User from '../../../domain/entities/user/User.FIX';
import CompanyDTO from './company.dto';

export default interface RecruiterProfilelOverviewDataDTO {
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
  rejection?: {
    reason?: string;
    feedback?: string;
  };
  isRejected?: boolean;
  applicationResendBufferDate?: Date;
  verificationTimeline?: { action: string; actor: string; createdAt: string; updatedAt: string }[];
  verificationHistory?: any;
  createdAt?: string;
  updatedAt?: string;
  userProfile: User;
  companyDetails?: CompanyDTO;
  jobs: Job[];
}

export interface AdminRecruiterApplicationsDTO {
  _id?: string;
  recruiterType?: 'self' | 'corporate';
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
  profileStatus?: 'pending' | 'under-review' | 'approved' | 'rejected' | 'closed';
  createdAt?: string;
  updatedAt?: string;
  userProfile?: User;
  companyDetails?: CompanyDTO;
}

export interface AdminRecruiterListDTO {
  _id?: string;
  recruiterType?: 'self' | 'corporate';
  fullName?: string;
  email?: string;
  isVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
  companyName?: string;
}

export interface AdminRecruiterDetailsDTO {
  _id?: string;
  recruiterType?: 'self' | 'corporate';
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
  isPermissionRevoked?: boolean
  verificationTimeline?: { action: string; actor: string; createdAt: string; updatedAt: string }[];
  createdAt?: string;
  updatedAt?: string;
  companyDetails?: CompanyDTO;
  totalJobs?: number;
  activeJobs?: number;
  totalApplications: number;
}
