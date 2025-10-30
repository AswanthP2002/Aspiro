import Comments from './user/comments.entity';
import User from './user/User';

export default interface PostsAggregated {
  _id: string;
  description: string;
  creatorId: string;
  likes: string[];
  media: {
    cloudUrl: string;
    publicId: string;
  };
  createdAt: string | Date;
  updatedAt: string | Date;
  userDetails: User;
  comments: Comments[]
}
