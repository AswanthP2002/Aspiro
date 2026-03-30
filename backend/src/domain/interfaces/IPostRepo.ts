import Post from '../entities/post/Post';
import PostsAggregated from '../entities/post/PostsAggregated.entity';
import IBaseRepo from './IBaseRepo';

export default interface IPostRepo extends IBaseRepo<Post> {
  likePost(postId: string, userId: string): Promise<Post | null>;
  unlikePost(postId: string, userId: string): Promise<Post | null>;
  getPostById(postId: string): Promise<Post | null>;
  getPostByUserId(userId: string): Promise<Post | null>;
  getPosts(hiddenList: string[], page: number, limit: number): Promise<PostsAggregated[] | null>;
}
