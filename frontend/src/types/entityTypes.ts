export default interface Candidate {
  _id?: string;
  userId?: string;
  name?: string | undefined;
  about?: string;
  dateOfBirth?: Date;
  socialLinks?: SocialLinks[];
  currentSubscription?: string;
  location?: {
    city?: string;
    district?: string;
    state?: string;
    country?: string;
    pincode?: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export type Role = 'candidate' | 'recruiter' | 'admin';

export interface User {
  _id?: string;
  password?: string;
  role?: Role;
  phone?: string;
  email?: string | undefined;
  googleid?: string;
  facebookid?: string;
  profilePicture?: {
    cloudinaryPublicId?: string;
    cloudinarySecureUrl?: string;
  };
  coverPhoto?: {
    cloudinaryPublicId?: string;
    cloudinarySecureUrl?: string;
  };
  isBlocked?: boolean;
  isVerified?: boolean;
  isAdmin?: boolean;
  createdAt?: string;
  updatedAt?: string;
  verificationToken?: string;
  otpExpiresAt?: Date;
}

export interface SocialLinks {
  domain: string;
  url: string;
}

export interface Skills {
  _id?: string;
  skillType: string;
  skill: string;
  skillLevel: string;
  userId?: string;
}

export interface Experience {
  _id?: string;
  candidateId?: string;
  role: string;
  jobtype: string;
  organization: string;
  startDate: any;
  ispresent: boolean;
  endDate: string;
  location: string;
  locationtype: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Education {
  _id?: string;
  userId?: string;
  educationStream: string; //particular group of education
  educationLevel: string;
  institution: string;
  location: string;
  startYear: string;
  isPresent: boolean;
  endYear?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Follow {
  _id?: string;
  follower?: string;
  following?: string;
  type: 'candidate' | 'recruiter';
  createdAt?: string;
  updatedAt?: string;
}

export interface Post {
  _id?: string
  creatorId?: string                 
  media : {
    cloudUrl : string
    publicId : string
  }
  description : string
  likes?: any[]       
  createdAt?: string
  updatedAt?: string
}

export interface UserType {
  _id?: string;
  name?: string;
  headline?: string;
  summary?: string;
  password?: string;
  dateOfBirth?: string;
  socialLinks: SocialLinks[];
  location?: {
    city?: string;
    district?: string;
    state?: string;
    country?: string;
    pincode?: string;
  };
  role?: Role[];
  phone?: string;
  email?: string;
  googleId?: string;
  facebookId?: string;
  linkedinId?: string;
  profilePicture?: {
    cloudinaryPublicId?: string;
    cloudinarySecureUrl?: string;
  };
  coverPhoto?: {
    cloudinaryPublicId?: string;
    cloudinarySecureUrl?: string;
  };
  isBlocked?: boolean;
  isVerified?: boolean;
  isAdmin?: boolean;
  isRecruiter?: boolean;
  createdAt?: string;
  updatedAt?: string;
  verificationToken?: string;
  otpExpiresAt?: Date;
}

export interface CandidatePersonalData {
  //LEGACY
  _id?: string;
  name: string;
  userId: string;
  socialLinks: SocialLinks[];
  createdAt?: string;
  updatedAt?: string;
  about: string;
  jobTitle: string;
  dateOfBirth: string;
  currentSubscription: string;
  userDetails: User;
  location?: {
    city?: string;
    district?: string;
    state?: string;
    country?: string;
    pincode?: string;
  };
  experience?: Experience[];
  skills?: Skills[];
  education?: Education[];
  followers?: Follow[];
  following?: Follow[];
  posts: Post[];
}

export interface Recruiter {
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
  about?: string;
  createdAt?: Date;
  updatedAt?: Date;
  currentSubscription?: string;
}

export interface UserPosts {
  _id?: string;
  description: string;
  creatorId: string;
  likes: string[];
  media: {
    cloudUrl: string;
    publicId: string;
  };
  createdAt: string | Date;
  updatedAt: string | Date;
  userDetails: UserType;
  comments: Comments[]
}

export interface Comments {
  _id?: string;
  postId?: string;
  userId?: string;
  text: string;
  createdAt?: string | Date;
  userDetails?: UserType;
}

export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Temporary';
export type WorkMode = 'On-site' | 'Remote' | 'Hybrid';
export type JobLevel = 'Entry-level' | 'Mid-level' | 'Senior-level' | 'Lead' | 'Manager';
export type SalaryPeriod = 'annually' | 'monthly' | 'weekly' | 'hourly';
export type JobStatus = 'draft' | 'active' | 'expired' | 'closed' | 'rejected' | 'blocked';

export interface Job {
   _id?: string;
  recruiterId?: string; // Renamed from companyId for clarity
  jobTitle: string;
  description: string;
  requirements: string;
  responsibilities: string;
  duration?: string; // Good for contract/temporary roles
  jobType?: JobType;
  workMode?: WorkMode;
  location: string;
  minSalary: number;
  maxSalary: number;
  salaryCurrency: string; // e.g., 'USD', 'INR'
  salaryPeriod?: SalaryPeriod;
  vacancies: number;
  qualification: string;
  experienceInYears: number; // More queryable than a string
  jobLevel?: JobLevel;
  requiredSkills: string[];
  optionalSkills: string[];
  status?: JobStatus; // Replaces isBlocked and isRejected for better state management
  rejectionReason?: string; // To provide feedback if status is 'rejected'
  views?: number; // For analytics
  applicationsCount?: number; // For analytics
  createdAt?: Date;
  updatedAt?: Date;
  expiresAt?: String;
}

export interface RecruiterProfileData {
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
  userProfile: User;
  jobs: Job[];
}

export interface JobAggregatedData {
   _id?: string;
  recruiterId?: string; // Renamed from companyId for clarity
  jobTitle: string;
  description: string;
  requirements: string;
  responsibilities: string;
  duration?: string; // Good for contract/temporary roles
  jobType?: JobType;
  workMode?: WorkMode;
  location: string;
  minSalary: number;
  maxSalary: number;
  salaryCurrency: string; // e.g., 'USD', 'INR'
  salaryPeriod?: SalaryPeriod;
  vacancies: number;
  qualification: string;
  experienceInYears: number; // More queryable than a string
  jobLevel?: JobLevel;
  requiredSkills: string[];
  optionalSkills: string[];
  status?: JobStatus; // Replaces isBlocked and isRejected for better state management
  rejectionReason?: string; // To provide feedback if status is 'rejected'
  views?: number; // For analytics
  applicationsCount?: number; // For analytics
  createdAt?: Date;
  updatedAt?: Date;
  expiresAt?: String;
  userDetails:UserType;
  recruiterProfile:Recruiter
}


export interface Certificates {
    _id? : string
    candidateId? : string
    issuedOrganization : string
    issuedDate : Date
    certificateId? : string
    certificateUrl? : string
    certificatePublicId? : string,
    createdAt? : Date
}

export interface UserProfileAggrgatedAdmin {
  _id?: string;
      name?: string;
      headline?: string;
      summary?: string;
      password?: string;
      dateOfBirth?: string;
      socialLinks?: SocialLinks[];
      location?: {
        city: string;
        district: string;
        state: string;
        country: string;
        pincode: string;
      };
      role?: Role[];
      phone?: string;
      email?: string;
      googleId?: string;
      facebookId?: string;
      linkedinId?: string;
      profilePicture?: {
        cloudinaryPublicId: string;
        cloudinarySecureUrl: string;
      };
      coverPhoto?: {
        cloudinaryPublicId: string;
        cloudinarySecureUrl: string;
      };
      isBlocked?: boolean;
      isVerified?: boolean;
      isAdmin?: boolean;
      isRecruiter?: boolean;
      createdAt?: string;
      updatedAt?: string;
      verificationToken?: string;
      otpExpiresAt?: Date;
      experiences: Experience[]
      educations: Education[]
      certificates: Certificates[]
      skills: Skills[]
      posts: Post[]
      recruiterProfile:Recruiter
      jobs:Job[]
}


/**
 *  _id?: string;
  name?: string;
  headline?: string;
  summary?: string;
  password?: string;
  dateOfBirth?: string;
  socialLinks?: SocialLinks[];
  location?: {
    city: string;
    district: string;
    state: string;
    country: string;
    pincode: string;
  };
  role?: Role[];
  phone?: string;
  email?: string;
  googleId?: string;
  facebookId?: string;
  linkedinId?: string;
  profilePicture?: {
    cloudinaryPublicId: string;
    cloudinarySecureUrl: string;
  };
  coverPhoto?: {
    cloudinaryPublicId: string;
    cloudinarySecureUrl: string;
  };
  isBlocked?: boolean;
  isVerified?: boolean;
  isAdmin?: boolean;
  isRecruiter?: boolean;
  createdAt?: string;
  updatedAt?: string;
  verificationToken?: string;
  otpExpiresAt?: Date;
 */

  //user entity as per backend