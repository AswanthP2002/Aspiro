import SocialLinks from '../socialLinks.entity';

export default interface Recruiter {
  _id?: string;
  userId?: string;
  name: string;
  employerType?: string;
  organizationDetails?: {
    organizationName: string;
    organizationType: string;
    industry: string;
    logo: {
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

/**
 * export default interface User {
   _id?: string;
   password?: string;
   role?: Role;
   phone?: string;
   email?: string | undefined;
   googleid?: string;
   facebookid?: string;
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
   createdAt?: string;
   updatedAt?: string;
   verificationToken?: string;
   otpExpiresAt?: Date;
 }
 */
