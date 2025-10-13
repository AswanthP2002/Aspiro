export type Role = 'candidate' | 'recruiter' | 'admin';

export default interface CreateUserDTO {
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
}