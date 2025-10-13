import Post from '../../../domain/entities/Post.entity';

export default interface ILikePost {
  execute(postId: string, userId: string): Promise<Post | null>;
}
