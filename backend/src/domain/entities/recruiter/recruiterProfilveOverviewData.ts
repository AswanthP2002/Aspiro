import Job from './job.entity';
import Recruiter from './recruiter.entity';
import SocialLinks from '../SocialLinks';
import User, { Role } from '../user/User';

/**
 * _id?: string;
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

export default interface RecruiterProfileOverviewData {
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
  userProfile: User;
  jobs: Job[];
}

/**
 * _id?: string;
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