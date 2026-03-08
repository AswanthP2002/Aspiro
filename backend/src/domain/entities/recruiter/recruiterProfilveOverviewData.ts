import Job from './job.entity';
import User from '../user/User.FIX';
import Company from '../company.entity';

export default interface RecruiterProfileOverviewData {
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
  rejection?: {
    reason?: string;
    feedback?: string;
  };
  isRejected?: boolean
  applicationResendBufferDate?: Date;
  verificationTimeline?: { action: string; actor: string; createdAt: string; updatedAt: string }[];
  createdAt?: string;
  updatedAt?: string;
  userProfile: User;
  companyDetails?: Company
  jobs: Job[];
}
