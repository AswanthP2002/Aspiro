import { PostDTO } from '../../../DTOs/post.dto';

export default interface IUnlikePostUsecase {
  execute(postId: string, userId: string): Promise<PostDTO | null>;
}
