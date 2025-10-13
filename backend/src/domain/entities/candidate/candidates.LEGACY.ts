import SocialLinks from '../socialLinks.entity';

export default interface Candidate {
  _id?: string;
  name?: string | undefined;
  username?: string;
  password?: string;
  role?: string;
  phone?: string;
  email?: string | undefined;
  googleid?: string;
  facebookid?: string;
  location?: {
    city: string;
    district: string;
    state: string;
    pincode: string;
    country: string;
  };
  profilePicture?: {
    cloudinaryPublicId: string;
    cloudinarySecureUrl: string;
  };
  coverPhoto?: {
    cloudinaryPublicId: string;
    cloudinarySecureUrl: string;
  };
  about?: string;
  dateOfBirth?: Date;
  isBlocked?: boolean;
  socialLinks?: SocialLinks[];
  currentSubscription?: string;
  isVerified?: boolean;
  isAdmin?: boolean;
  verificationToken?: string;
  otpExpiresAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
