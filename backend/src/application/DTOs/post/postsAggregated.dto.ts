import Comments from '../../../domain/entities/comment/comments.entity';
import User from '../../../domain/entities/user/User.FIX';

export default interface PostsAggregatedDTO {
  _id: string;
  description: string;
  mediaType: string;
  userId: string;
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
  comments: Comments[];
}
