import { Role } from "../../../domain/entities/user/User.FIX";
import SocialLinks from "../../../domain/entities/SocialLinks";
import {IsNotEmpty, isEmail, minLength, maxLength, IsOptional, isDefined} from 'class-validator'

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

    role?: Role[];
    phone?: string;
    email?: string;
    googleId?: string;
    facebookId?: string;
    connections?: string[]
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
