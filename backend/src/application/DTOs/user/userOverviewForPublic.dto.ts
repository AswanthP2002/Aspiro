import Follow from '../../../domain/entities/follow.entity';
import ConnectionRequest from '../../../domain/entities/user/connectionRequest.entity';
import Experience from '../../../domain/entities/user/experience.entity';
import Skills from '../../../domain/entities/user/skills.entity';
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
  createdAt?: string;
  updatedAt?: string;
}

export interface PaginatedUserOverviewForPublicDTO {
  users: UserOverviewForPublicDTO[];
  page: number;
  totalPages: number;
}
