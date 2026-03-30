import Comments from '../comment/comments.entity';
import User from '../user/User.FIX';

export default interface PostsAggregated {
  _id: string;
  description: string;
  creatorId: string;
  likes: string[];
  mediaType: string;
  media?: {
    cloudUrl: string;
    publicId: string;
  };
  shares: string[];
  views: string[];
  createdAt: string | Date;
  updatedAt: string | Date;
  userDetails: User;
  comments: Comments[];
}
