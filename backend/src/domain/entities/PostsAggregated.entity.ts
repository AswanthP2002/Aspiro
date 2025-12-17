import Comments from './user/comments.entity';
import User from './user/User.FIX';

export default interface PostsAggregated {
  _id: string;
  description: string;
  creatorId: string;
  likes: string[];
  media?: {
    cloudUrl: string;
    publicId: string;
  };
  shares: string[];
  views: string[];
  createdAt: string | Date;
  updatedAt: string | Date;
  userDetails: User;
  comments: Comments[]
}
