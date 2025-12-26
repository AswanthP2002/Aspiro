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
  profileStatus?: 'pending' | 'approved' | 'rejected' | 'suspended' | 'closed';
  summary?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
