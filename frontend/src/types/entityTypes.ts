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
  type: string;
  skill: string;
  level: string;
  candidateId?: string;
}

export interface Experience {
  _id?: string;
  candidateId?: string;
  role: string;
  jobtype: string;
  organization: string;
  startdate: string;
  ispresent: boolean;
  enddate: string;
  location: string;
  locationtype: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Education {
  _id?: string;
  candidateId?: string;
  stream: string; //particular group of education
  level: string;
  organization: string;
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
  _id?: string;
  creatorId?: string;
  creatorType: 'candidate' | 'recruiter';
  media: {
    url: string;
    publidId: string;
  };
  content: string;
  likes?: any[];
  createdAt?: string;
  updatedAt?: string;
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

export interface CandidatePersonalData { //LEGACY
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
