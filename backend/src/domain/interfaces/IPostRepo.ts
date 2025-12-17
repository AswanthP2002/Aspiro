import Post from '../entities/user/Post';
import PostsAggregated from '../entities/PostsAggregated.entity';
import IBaseRepo from './IBaseRepo';

export default interface IPostRepo extends IBaseRepo<Post> {
  likePost(postId: string, userId: string): Promise<Post | null>;
  unlikePost(postId: string, userId: string): Promise<Post | null>;
  getPostById(postId: string): Promise<Post | null>;
  getPostByUserId(userId: string): Promise<any | null>;
  getPosts(): Promise<PostsAggregated[] | null>;
}
