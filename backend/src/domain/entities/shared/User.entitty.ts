export type Role = 'candidate' | 'recruiter' | 'admin';

export default interface User {
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
