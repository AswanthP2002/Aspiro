import { Exclude, Expose, Transform } from 'class-transformer';
import Job from '../../../domain/entities/recruiter/job.entity';
import User from '../../../domain/entities/user/User.FIX';

@Exclude()
export default class RecruiterProfilelOverviewDataDTO {
  @Expose()
  _id?: string;

  @Expose()
  userId?: string;

  @Expose()
  employerType?: string;

  @Expose()
  organizationDetails?: {
    organizationName?: string;
    organizationType?: string;
    industry?: string;
    organizationContactNumber?: string;
    organizationEmail?: string;
    teamStrength?: string;
    website?: string;
  };

  @Expose()
  recruitingExperience?: string;

  @Expose()
  focusingIndustries?: string[];

  @Expose()
  profileStatus?: 'pending' | 'approved' | 'rejected';

  @Expose()
  @Transform(({ value }) => value || false)
  isSuspended?: boolean;

  @Expose()
  @Transform(({ value }) => value || false)
  isDeleted?: boolean;

  @Expose()
  summary?: string;

  @Expose()
  createdAt?: Date;

  @Expose()
  updatedAt?: Date;

  @Expose()
  userProfile!: User;

  @Expose()
  jobs!: Job[];
}
