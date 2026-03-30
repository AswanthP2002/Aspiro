import Follow from '../../../domain/entities/follow/follow.entity';
import ConnectionRequest from '../../../domain/entities/connection/connectionRequest.entity';
import Experience from '../../../domain/entities/experience/experience.entity';
import Skills from '../../../domain/entities/skill.user/skills.entity';
import { Role } from '../../../domain/entities/user/User.FIX';

export default interface UserOverviewForPublicDTO {
  _id?: string;
  name?: string;
  headline?: string;
  summary?: string;
  role?: Role[];
  connections?: string[];
  followers?: Follow[];
  connectionRequests?: ConnectionRequest[];
  skills?: Skills[];
  profilePicture?: {
    cloudinaryPublicId: string;
    cloudinarySecureUrl: string;
  };
  experience?: Experience[];
  isRecruiter?: boolean;
  isVerifiedRecruiter?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface PaginatedUserOverviewForPublicDTO {
  users: UserOverviewForPublicDTO[];
  page: number;
  totalPages: number;
}
