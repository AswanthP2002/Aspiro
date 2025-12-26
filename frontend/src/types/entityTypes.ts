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
   _id? : string
    userId? : string
    jobRole : string
    jobType : string
    organization : string
    startDate? : string
    isPresent : boolean
    endDate? : string //for checking
    location : string
    workMode : string
    createdAt? : string
    updatedAt? : string
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
  userId?: string                 
  media? : {
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
  connections?: string[]
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
    benefit?: string;
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
  userId: string;
  likes: string[];
  media?: {
    cloudUrl: string;
    publicId: string;
  };
  shares: string[];
  views: string[];
  createdAt: string | Date;
  updatedAt: string | Date;
  userDetails: UserType;
  comments: Comments[];
}

export interface UserMetaData {
  _id?: string;
  name?: string;
  headline?: string;
  profilePicture?: {
    cloudinaryPublicId: string;
    cloudinarySecureUrl: string;
  };
}

export interface Notification {
  _id?: string
  recepientId?: string
  type: 'USER_ACTION' | 'JOB_ALERT' | 'SYSTEM_NOTICE'
  category: 'LIKE' | 'COMMENT' | 'FOLLOW' | 'CONNECTION_REQUEST' | 'CONNECTION_ACCEPTED' | 'EXPIRY' | 'APPLICATION_STATUS_CHANGE' | 'JOB'
  actorId?: string
  targetType?: 'USER' | 'JOB' | 'POST' | 'RECRUITER' | 'APPLICATION'
  targetId?: string
  message?: string
  isRead?: boolean
  createdAt?: string
  metaData?: {[key: string]: string | number | boolean | object | undefined | null | Date | any}
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
  expiresAt?: string;
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
    teamStrength?: string;
    website?: string;
    linkedinUrl?: string
  };
  recruitingExperience?: string
  focusingIndustries?:string[]
  profileStatus?: 'pending' | 'approved' | 'rejected'
  isSuspended?: boolean;
  isDeleted?: boolean
  summary?: string;
  createdAt?: Date;
  updatedAt?: Date;
  userProfile: UserType;
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
  expiresAt?: string;
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
      connections?: string[]
      posts: Post[]
      recruiterProfile:Recruiter
      jobs:Job[]
}

export interface UserProfileAggregated {
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
      connections?: string[]
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
      posts: UserPosts[]
      recruiterProfile:Recruiter
      jobs:Job[]
      followers: string[]
}

export interface JobDetails {
   _id?: string;
  recruiterId?: string; 
  jobTitle: string;
  description: string;
  requirements: string;
  responsibilities: string;
  duration?: string; 
  jobType?: JobType;
  workMode?: WorkMode;
  location: string;
  minSalary: number;
  maxSalary: number;
  salaryCurrency: string; 
  salaryPeriod?: SalaryPeriod;
  vacancies: number;
  qualification: string;
  experienceInYears: number; 
  jobLevel?: JobLevel;
  requiredSkills: string[];
  optionalSkills: string[];
  status?: JobStatus; 
  rejectionReason?: string; 
  views?: number; 
  applicationsCount?: number; 
  createdAt?: Date;
  updatedAt?: Date;
  expiresAt?: string;
  userProfile:UserType;
  userRecruiterProfile:RecruiterProfileData
  candidateIds: string[]
}

export interface ApplicationsAggregated {
  _id?: string;
    candidateId: string;
    jobId: string;
    coverLetterContent: string;
    resumeId: string;
    status: 'applied' | 'opened' | 'screening' | 'interview' | 'offer' | 'hired' | 'rejected';
    createdAt: Date;
    updatedAt: Date;
    job: Job
    applicant: UserType;
    resume: any;
    experiences: Experience[];
    educations: Education[]
    skills: Skills[]
}

export interface FavoriteJob {
  _id?: string;
  candidateId?: string;
  jobId?: string;
  createdAt?: string;
  jobDetails: Job;
  postedBy: UserType;
  recruiterProfile: Recruiter
}

export interface MyApplications {
  _id: string;
  coverLetterContent: string;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  candidateId: string;
  jobId: string;
  resumeId: string;
  jobDetails: Job;
  recruiterProfile: Recruiter;
  recruiterUserProfile: UserType
}

export interface ConversationParticipants {
    userId?: string;
    joinedAt?: string | Date
}
export interface Conversation {
    _id?: string;
    type?: "private" | "group";
    participants?:ConversationParticipants[];
    lastMessage?:{
        text?: string,
        senderId?: string,
        sendAt?: string | Date
    }
    userInfo?: UserType
    createdAt?: string
    updatedAt?: string
}

export interface MessageReadBy {
    userId?: string
    readAt?: string | Date
}
export interface Message {
    _id?: string
    conversationId?: string
    senderId?: string
    content?: {
        text?: string,
        attachments?: any[]
    }
    readBy?: MessageReadBy[]
    isDeleted?: boolean
    createdAt?: string | Date
    updatedAt?: string | Date
}

  //user entity as per backend