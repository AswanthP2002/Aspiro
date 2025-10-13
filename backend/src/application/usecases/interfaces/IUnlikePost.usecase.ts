import Post from '../../../domain/entities/Post.entity';

export default interface IUnlikePost {
  execute(postId: string, userId: string): Promise<Post | null>;
}
