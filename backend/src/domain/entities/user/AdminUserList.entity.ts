import { Role } from './User.FIX';

export default interface AdminUserListDTO {
  _id?: string;
  name?: string;
  role?: Role[];
  email?: string;
  profilePicture?: {
    cloudinaryPublicId: string;
    cloudinarySecureUrl: string;
  };
  isBlocked?: boolean;
  isBanned?: boolean;
  isDeleted?: boolean;
  isVerified?: boolean;
  createdAt?: string;
}
