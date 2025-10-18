import SocialLinks from '../../../domain/entities/SocialLinks';

export default interface UpdateCandidateDTO {
  _id?: string;
  userId?: string;
  name?: string | undefined;
  jobTitle?: string | undefined;
  about?: string;
  dateOfBirth?: Date;
  socialLinks?: SocialLinks[];
  currentSubscription?: string;
  location?: {
    city?: string;
    district?: string;
    state?: string;
    country?: string;
    pincode?: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}
