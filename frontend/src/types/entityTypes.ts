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

export interface FollowerData {
   _id?: string;
  follower?: string;
  following?: string;
  createdAt?: string;
  updatedAt?: string;
  userDetails?: {
    _id?: string,
    name?: string,
    headline?: string,
    profilePicture?: string
  }
}

export interface FollowingsData {
   _id?: string;
  follower?: string;
  following?: string;
  createdAt?: string;
  updatedAt?: string;
  userDetails?: {
    _id?: string,
    name?: string,
    headline?: string,
    profilePicture?: string
  }
}

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

export interface MyApplicationsListData {
   _id?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  jobDetails?: {
    _id?: string;
    jobTitle?: string;
    minSalary?: number;
    jobType?: string;
    workMode?: string;
    jobLevel?: string;
  };
  recruiterDetails?: {
    _id?: string;
    name?: string;
  };
  companyDetails?: {
    _id?: string;
    name?: string;
  };
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
    description?: string;
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
  
  likes?: string[]       
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
  isBanned?: boolean;
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
  mediaType?: string;
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

export interface ConnectionRequests {
    _id?: string;
  receiver?: string;
  sender?: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELED';
  createdAt?: string;
  updatedAt?: string;
}

export interface Notification {
  _id?: string;
  recepientId?: string;
  category:
    | 'LIKE'
    | 'COMMENT'
    | 'FOLLOW'
    | 'CONNECTION_REQUEST'
    | 'CONNECTION_ACCEPTED'
    | 'COMMENT_REPLY'
    | 'SHARE';
  actorId?: string;
  targetType?: 'USER' | 'POST' | 'COMMENT';
  targetId?: string;
  targetUrl?: string;
  message?: string;
  isRead?: boolean;
  metadata?: { [key: string]: string | number | null | undefined | object | Date };
  createdAt?: string;
  actorDetails?:{
    _id?: string,
    name?: string,
    profilePicture?: string,
    headline?: string
  }
}

type ConnectionRequestStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELED';

export interface ConnectionDetails {
  _id?: string;
  receiver?: string;
  sender?: string;
  status: ConnectionRequestStatus;
  createdAt?: string;
  updatedAt?: string;
  senderDetails?:{
    _id?: string,
    name?: string,
    headline?: string,
    profilePicture?: string
  }
}

export interface Comments {
  _id?: string;
  postId?: string;
  userId?: string;
  parentId?: string | null;
  text: string;
  depth?: number;
  likes?: number;
  replyCount?: number;
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

export interface AdminRecruiterListData {
  _id?: string;
  recruiterType?: 'self' | 'corporate';
  fullName?: string;
  email?: string;
  isVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
  companyName?: string
}

export interface AdminRecruiterDetailsData {
  _id?: string;
  recruiterType?: 'self' | 'corporate';
  fullName?: string;
  profiessionalTitle?: string;
  email?: string;
  phone?: string;
  isPermissionRevoked?:boolean
  yearOfExperience?: string;
  linkedinUrl?: string;
  verificationDocument?: {
    publicId?: string;
    url?: string;
  };
  isVerified?: boolean;
  isOrphan?: boolean;
  verificationTimeline?: { action: string; actor: string; createdAt: string; updatedAt: string }[];
  createdAt?: string;
  updatedAt?: string;
  companyDetails?: Company;
  totalJobs?: number;
  activeJobs?: number;
  totalApplications: number;
}

export interface MyJobData {
  _id?: string;
  jobTitle: string;
  jobType?: string;
  workMode?: string;
  location?: string;
  jobLevel?: string;
  status?: JobStatus;
  views?: number;
  applicationsCount?: number;
  isDeleted?: boolean;
  isArchived?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  expiresAt?: string;
}

export interface AdminJobListsData {
  _id?: string;
  jobTitle: string;
  jobType?: string;
  workMode?: string;
  jobLevel?: string;
  reportsCount?: number;
  status?: JobStatus;
  isDeleted?: boolean;
  isArchived?: boolean;
  isFlagged?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  expiresAt?: string;
  companyName?: string
  recruiterName?: string
}

export interface AdminJobDetailsData {
  _id?: string;
  jobTitle: string;
  description: string;
  requirements: string;
  responsibilities: string;
  jobType?: string;
  workMode?: string;
  location?: string;
  minSalary: number;
  maxSalary: number;
  qualification: string;
  jobLevel?: string;
  reportsCount?: number;
  requiredSkills: string[];
  optionalSkills: string[];
  status?: JobStatus; // Replaces isBlocked and isRejected for better state management
  views?: number; // For analytics
  applicationsCount?: number; // For analytics
  isDeleted?: boolean;
  isArchived?: boolean;
  isFlagged?: boolean
  createdAt?: Date;
  updatedAt?: Date;
  expiresAt?: string;
  companyName?: string;
  recruiterName?: string
}

export interface LoadJobsForPublicData {
  _id?: string;
  recruiterId?: string;
  companyId?: string;
  jobTitle: string;
  duration?: string;
  jobType?: string;
  workMode?: string;
  location?: string;
  minSalary: number;
  maxSalary: number;
  salaryCurrency: string;
  salaryPeriod?: SalaryPeriod;
  experience?: string;
  jobLevel?: string;
  requiredSkills: string[];
  createdAt?: Date;
  updatedAt?: Date;
  expiresAt?: string;
  companyDetails?: {
    _id?: string;
    name?: string;
  };
  recruiterDetail?: {
    _id?: string;
    recruiterType?: string
    name?: string;
    isFlagged?: boolean;
    isVerified?: boolean;
  };
}

export interface SimilarSkillUserData {
  _id: string;
  name: string;
  headline: string;
  profilePicture: string
}

export interface RecommendedJobsData {
  _id?: string;
  jobTitle?: string;
  recruiterDetails: {
    _id: string;
    name: string;
  };
  companyDetails: {
    _id: string;
    name: string;
  };
}


export interface JobDetailsForPublicData {
  _id?: string;
    recruiterId?: string;
    companyId?: string; // Renamed from companyId for clarity
    jobTitle: string;
    description: string;
    requirements: string;
    responsibilities: string;
    duration?: string; // Good for contract/temporary roles
    jobType?: string;
    workMode?: string;
    location?: string;
    minSalary: number;
    maxSalary: number;
    salaryCurrency: string; // e.g., 'USD', 'INR'
    salaryPeriod?: SalaryPeriod;
    vacancies: number;
    qualification: string;
    experienceInYears: number; // More queryable than a string
    jobLevel?: string;
    requiredSkills: string[];
    optionalSkills: string[];
    applicationsCount?: number; // For analytics
    isFlagged?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    expiresAt?: string;
    recruiterProfileDetails?: {
      _id: string;
      name: string;
      recruiterType: string;
      professionalTitle: string;
      isVerifiedRecruiter: boolean;
    };
    companyProfileDetails?: {
      _id: string;
      name: string;
    };
}

export interface MySavedJobData {
   _id?: string;
  createdAt?: string;
  jobDetails: {
    _id?: string;
    jobTitle: string;
    jobType?: string;
    workMode?: string;
    location?: string;
    minSalary: number;
    maxSalary: number;
    salaryCurrency: string; // e.g., 'USD', 'INR'
    salaryPeriod?: SalaryPeriod;
    vacancies: number;
    jobLevel?: string;
    requiredSkills: string[];
    applicationsCount?: number; // For analytics
    isFlagged?: boolean;
    expiresAt?: string;
  };
  recruiterDetails: {
    _id: string;
    name: string;
  };
  companyDetails: {
    _id: string;
    name: string;
  };
}

export type JobApplicationStatusData =
  | 'applied'
  | 'opened'
  | 'screening'
  | 'interview'
  | 'offer'
  | 'hired'
  | 'rejected';


export interface JobApplicationsListForRecruiter {
    _id?: string;
  status?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  candidateDetails?: {
    _id?: string;
    name?: string;
    email?: string;
    headline?: string;
    location?: string;
    match?: number;
  };
}

export interface SingleJobApplicationDetailsData {
  _id?: string;
  status?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  candidateDetails?: {
    _id?: string;
    name?: string;
    email?: string;
    headline?: string;
    phone?: string;
    location?: string;
    match?: number;
  };
  jobDetails?:{
    _id: string,
    jobTitle: string
  }
  experiences?: Experience[];
  educations?: Education[];
  skills?: Skills[];
  notes?: string;
  resumeDetails?: {
    _id?: string;
    url?: string;
  };
}

export interface InterviewData {
   _id?: string;
  candidateId?: string;
  jobId?: string;
  interviewersName?: string;
  interviewType?: 'Technical' | 'HR' | 'Mnaegirial' | 'General';
  interviewDate?: string | Date;
  interviewTime?: string;
  gmeetUrl?: string;
  note?: string;
  status?: 'Scheduled' | 'Completed' | 'Cancelled';
  createdAt?: string | Date;
  upddatedAt?: string | Date;
}

export interface TrackMyJobApplicationData {
  _id?: string;
  status?: JobApplicationStatusData;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
  jobDetails?:{
    _id: string,
    jobTitle: string,
  },
  recruiterDetails?:{
    _id: string,
    name: string
  },
  companyDetails?:{
    _id: string
    name: string
  }
}

export interface RecruiterProfileData {
  _id?: string;
  userId?: string;
  recruiterType?: 'freelance' | 'corporate';
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
  verificationHistory?: any;
  createdAt?: string;
  updatedAt?: string;
  userProfile: UserType;
  companyDetails?: Company
  verificationTimeline?: { action: string; actor: string; createdAt: string; updatedAt: string }[];
  jobs: Job[];
}

export interface RecruiterJobDetailsData {
  _id?: string;
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
  qualification: string;
  experienceInYears: number;
  jobLevel?: JobLevel;
  requiredSkills: string[];
  optionalSkills: string[];
  status?: JobStatus;
  views?: number;
  applicationsCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
  expiresAt?: string;
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
  _id?: string;
  userId?: string;
  name?: string;
  issuedOrganization: string;
  issuedDate?: string;
  certificateUrl?: string;
  certificatePublicId?: string;
  createdAt?: string;
}

export interface UserPublicProfileData {
  _id: string;

  name: string;

  headline: string;

  summary: string;

  socialLinks?: SocialLinks[];

  location?: {
    city: string;
    district: string;
    state: string;
    country: string;
    pincode: string;
  };

  role?: Role[];

  email?: string;

  profilePicture?: {
    cloudinaryPublicId: string;
    cloudinarySecureUrl: string;
  };

  coverPhoto?: {
    cloudinaryPublicId: string;
    cloudinarySecureUrl: string;
  };

  isRecruiter?: boolean;

  createdAt?: string;

  updatedAt?: string;

  experiences: Experience[];

  educations: Education[];

  certificates: Certificates[];

  skills: Skills[];

  posts: Post[];

  recruiterProfile: Recruiter;

  jobs: Job[];

  followers: Follow[];

  following?: Follow[];

  connections: string[];

  connectionRequests: ConnectionRequests[]
}

export interface Alerts {
    _id?: string;
    recipientId?: string;
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
    type: 'JOB_MATCH' | 'APPLICATION_UPDATE' | 'SYSTEM_SECURITY' | 'EXPIRY';
    status: 'ACTIVE' | 'RESOLVED' | 'DISMISSED';
    title: string;
    body: string;
    actionUrl?: string;
    expiresAt?: string;
    metaData?: { [key: string]: string | number | boolean | Date | object | null | undefined };
    createdAt?: string;
}

export interface AlertsData {
  _id?: string;
  recipientId?: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  type: 'JOB_MATCH' | 'APPLICATION_UPDATE' | 'SYSTEM_SECURITY' | 'EXPIRY';
  status: 'ACTIVE' | 'RESOLVED' | 'DISMISSED';
  title: string;
  body: string;
  actionUrl?: string;
  expiresAt?: string;
  metaData?: { [key: string]: string | boolean | number | object };
  createdAt?: string;
}

export interface Resumes {
  _id?: string;
  userId?: string;
  name?: string;
  resumeUrlCoudinary?: string;
  resumePublicIdCloudinary?: string;
  isPrimary?: boolean;
  createdAt?: string;
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
    participants?:UserType[];
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

export interface Chat {
   _id?: string;
  conversationId?: string;
  senderId?: string;
  receiverId?: string;
  text: string;
  isRead?: boolean;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string
}

export interface PlanData {
  _id?: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  trialPeriod: number;
  badgeIcon: string;
  isListed: boolean;
  currency: 'INR' | 'USD';
  billingCycle: 'monthly' | 'yearly';
  features: string[];
  featuresListed: { [key: string]: string | number };
  isActive: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface SubscriptionAnalyticsData {
  stats: {
    totalMRR: number;
    activeRecruiters: number;
    churnRate: number;
  };
  revenueGrowth: { month: string; amount: number }[];
  subscribers: SubscriberDetailsData[]
}

export interface SubscriberDetailsData {
  userName: string;
  userEmail: string;
  planName: string;
  billingCycle: string;
  nextRenewal: Date | string;
  amount: number;
  paymentStatus: string;
  status: string;
}

export interface DetailedResumeAnalysisAiData {
  overallScore: number;
  metrics: {
    atsCompatibility: number;
    contentQuality: number;
    formatStructure: number;
    keywordMatch: number;
  };
  feedback: {
    criticalIssues: string[];
    recommendations: string[];
  };
  keywords: {
    found: string[];
    missing: string[];
  };
  sectionAnalysis: [
    { section: 'Contact Information'; status: 'Incomplete' | 'Complete'; score: number },
    { section: 'Professional Summary'; status: 'Incomplete' | 'Complete'; score: number },
    { section: 'Work Experience'; status: 'Incomplete' | 'Complete'; score: number },
    { section: 'Education'; status: 'Incomplete' | 'Complete'; score: number },
    { section: 'Skills'; status: 'Incomplete' | 'Complete'; score: number },
    { section: 'Certifications'; status: 'Incomplete' | 'Complete'; score: number },
  ];
}

export interface InterviewDashboardData {
  totalInterviews: number;
  averageScore: number;
  streak: number;
  totalPracticeTime: string;
  performance: { attempt: number; score: number }[];
  history: { title: string; score: number, createdAt: string }[];
}


export interface UserSubscriptionAndPlanDetailsData {
  _id?: string;
  userId?: string;
  planId?: string;
  stripeSubscriptionId?: string;
  stripeCustomerId?: string;
  status: 'active' | 'canceled' | 'incomplete' | 'past_due';
  currentPeriodStart?: string | Date;
  currentPeriodEnd?: string | Date;
  isCanceled?: boolean;
  paymentStatus?: 'paid' | 'pending' | 'failed';
  createdAt?: string | Date;
  updatedAt?: string | Date;
  planDetails: PlanData;
}

export interface InvoiceData {
  id?: string;
  amount?: number;
  status?: string;
  date?: string | Date;
  downloadUrl?: string;
  hostedUrl?: string;
}

export interface PaymentMethodsStripeData {
  brand: string;
  last4: string;
  expMonth: string;
  expYear: string;
}

export interface UserFullProfileData {
  _id?: string;
  name?: string;
  headline?: string;
  summary?: string;
  //   socialLinks?: SocialLinks[];
  location?: {
    city: string;
    district: string;
    state: string;
    country: string;
    pincode: string;
    coords?: {
      type: 'Point';
      coordinates: [number, number]; //long lat order
    };
  };
  phone?: string;
  email?: string;
  connections?: string[];
  profilePicture?: {
    cloudinaryPublicId: string;
    cloudinarySecureUrl: string;
  };
  coverPhoto?: {
    cloudinaryPublicId: string;
    cloudinarySecureUrl: string;
  };
  experiences: Experience[];
  educations: Education[];
  skills: Skills[];
  certificates: Certificates[];
}


export interface MyProfileDTO {
    _id?: string;
  name?: string;
  headline?: string;
  summary?: string;
  dateOfBirth?: string;
  socialLinks?: SocialLinks[];
  location?: {
    city: string;
    district: string;
    state: string;
    country: string;
    pincode: string;
  };
  phone?: string;
  email?: string;
  connections?: number
  profilePicture?: {
    cloudinaryPublicId?: string;
    cloudinarySecureUrl?: string;
  };
  coverPhoto?: {
    cloudinaryPublicId?: string;
    cloudinarySecureUrl?: string;
  };
  isVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
  followers?: number;
  following?: number;
  applicationsCount?: JobApplicationStatusData[];
  savedJobs?: FavoriteJob[];
  views?: string[];
}

export interface UserOverviewForPublic {
  _id?: string;
  name?: string;
  headline?: string;
  summary?: string;
  role?: Role[];
  connections?: string[];
  connectionRequests?: ConnectionRequests[]
  followers?: Follow[];
  skills?: Skills[]
  profilePicture?: {
    cloudinaryPublicId: string;
    cloudinarySecureUrl: string;
  };
  experience?: Experience[]
  isRecruiter?: boolean;
  createdAt?: string;
  updatedAt?: string;
  isVerifiedRecruiter?: boolean;
}


export interface AdminUserDetailsData {
  _id: string;
  name: string;
  summary: string;
  location?: {
    city: string;
    district: string;
    state: string;
    country: string;
    pincode: string;
    coords: {
      type: 'Point';
      coordinates: [number, number];
    };
  };
  role?: Role[];
  email?: string;
  profilePicture?: {
    cloudinaryPublicId: string;
    cloudinarySecureUrl: string;
  };
  isRecruiter?: boolean;
  isBanned?: boolean;
  accountActions?: {action: string, actor: string, date: string}[]
  isVerified?: boolean;
  isBlocked?: boolean;
  createdAt?: string;
  googleId?: string
  updatedAt?: string;
  experiences: Experience[];
  educations: Education[];
  skills: Skills[];
  posts: Post[];
  lastLogin?: string | Date;
}

export interface Company {
  _id?: string;
  name: string;
  slogan?: string;
  website?: string;
  linkedin?: string;
  description?: string;
  industry?: string;
  location?: string;
  logo?: {
    cloudinaryPublicId: string;
    cloudinarySecureUrl: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}


export interface WorkModeData {
  _id?: string;
  name: string;
  slug: string;
  isActive: boolean;
  usageCount?: number
  createdAt?: string;
}

export interface JobLevelData {
  _id?: string;
  name: string;
  slug: string;
  usageCount?: string;
  isActive: boolean;
  createdAt?: string;
}

export interface JobTypesData {
  _id?: string;
  name?: string;
  slug?: string;
  isActive?: boolean;
  usageCount?: number;
  createdAt?: string;
}

export interface AdminRecruiterApplicationsData {
  _id?: string;
  recruiterType?: 'self' | 'corporate';
  fullName?: string;
  // professionalTitle?: string;
  email?: string;
  // phone?: string;
  // yearOfExperience?: string;
  // linkedinUrl?: string;
  // verificationDocument?: {
  //   publicId?: string;
  //   url?: string;
  // };
  isVerified?: boolean;
  profileStatus?: 'pending' | 'under-review' | 'approved' | 'rejected' | 'closed';
  createdAt?: string;
  //updatedAt?: string;
  //userProfile?: User;
  //companyDetails?: Company;
}

export interface AdminRecruiterApplicationDetailsData {
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
  // updatedAt?: string;
  userProfile?: User;
  companyDetails?: Company;
}