import User from '../../domain/entities/shared/User';
import { Role } from './user/user.dto';

export default interface PostsAggregatedDTO {
  _id: string;
  content: string;
  creatorId: string;
  creatorType: Role;
  likes: string[];
  media: {
    url: string;
    publidId: string;
  };
  createdAt: string | Date;
  updatedAt: string | Date;
  createdUserDetails: User;
  profileDetails: any;
}
