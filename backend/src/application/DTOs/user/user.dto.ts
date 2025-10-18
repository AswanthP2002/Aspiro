import { Role } from "../../../domain/entities/shared/User";
import SocialLinks from "../../../domain/entities/SocialLinks";

export default interface UserDTO {
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

//export type Role = 'user' | 'recruiter' | 'admin';
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
}