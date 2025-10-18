import User, { Role } from './shared/User';

export default interface PostsAggregated {
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
