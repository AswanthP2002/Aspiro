
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
}
