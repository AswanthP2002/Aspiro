import SocialLinks from '../SocialLinks';

export type Role = 'user' | 'recruiter' | 'admin';

export default interface User {
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
  // _id?: string;
  // password?: string;
  // role?: Role;
  // phone?: string;
  // email?: string | undefined;
  // googleid?: string;
  // facebookid?: string;
  // profilePicture?: {
  //   cloudinaryPublicId: string;
  //   cloudinarySecureUrl: string;
  // };
  // coverPhoto?: {
  //   cloudinaryPublicId: string;
  //   cloudinarySecureUrl: string;
  // };
  // isBlocked?: boolean;
  // isVerified?: boolean;
  // isAdmin?: boolean;
  // createdAt?: string;
  // updatedAt?: string;
  // verificationToken?: string;
  // otpExpiresAt?: Date;
}
