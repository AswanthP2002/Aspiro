import SocialLinks from '../../../domain/entities/SocialLinks';

export default interface CandidateDTO {
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

export interface EditCandidateDTO {
  id: string;
  name: string;
  role: string;
  city: string;
  district: string;
  state: string;
  country: string;
  about: string;
}

export interface GetUsersForPublicDTO {
  search: string;
  page: number;
  limit: number;
  sort?: string;
  roleTypeFilter?: string;
  experienceFilter?: string;
  location?: string;
}
