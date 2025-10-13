import SocialLinks from '../../../domain/entities/socialLinks.entity';

export default interface UpdateCandidateDTO {
  _id?: string; // domain entity id changed to string :: removed objectid prevent leakage of infrastructure details
  name?: string;
  password?: string;
  role?: string;
  phone?: string;
  email?: string;
  googleid?: string;
  facebookid?: string;
  location?: {
    city?: string;
    district?: string;
    state?: string;
    pincode?: string;
    country?: string;
  };
  profilePicture?: {
    cloudinaryPublicId?: string;
    cloudinarySecureUrl?: string;
  };
  coverPhoto?: {
    cloudinaryPublicId?: string;
    cloudinarySecureUrl?: string;
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
