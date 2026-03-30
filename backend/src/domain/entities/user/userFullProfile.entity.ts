import Certificates from "../certificate/certificates.entity";
import Education from "../education/educations.entity";
import Experience from "../experience/experience.entity";
import Skills from "../skill.user/skills.entity";
import SocialLinks from "./SocialLinks";
import { Role, AccountAction } from "./User.FIX";

export default interface UserFullProfileData {
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
    coords?: {
      type: 'Point';
      coordinates: [number, number]; //long lat order
    };
  };
  role?: Role[];
  phone?: string;
  email?: string;
  googleId?: string;
  facebookId?: string;
  linkedinId?: string;
  connections?: string[];
  profilePicture?: {
    cloudinaryPublicId: string;
    cloudinarySecureUrl: string;
  };
  coverPhoto?: {
    cloudinaryPublicId: string;
    cloudinarySecureUrl: string;
  };
  isBlocked?: boolean;
  isBanned?: boolean;
  isDeleted?: boolean;
  isVerified?: boolean;
  isAdmin?: boolean;
  isRecruiter?: boolean;
  gender?: 'Male' | 'Female';
  createdAt?: string;
  updatedAt?: string;
  verificationToken?: string;
  accountActions?: AccountAction[];
  otpExpiresAt?: Date;
  hiddenPosts?: string[];
  lastLogin?: Date;
  experiences: Experience[],
  educations: Education[],
  skills: Skills[],
  certificates: Certificates[]
}
