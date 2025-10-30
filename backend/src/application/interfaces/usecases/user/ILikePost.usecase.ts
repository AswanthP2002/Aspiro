import { PostDTO } from '../../../DTOs/post.dto';

export default interface ILikePostUsecase {
  execute(postId: string, userId: string): Promise<PostDTO | null>;
}
