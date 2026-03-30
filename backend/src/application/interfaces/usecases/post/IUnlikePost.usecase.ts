import { PostDTO } from '../../../DTOs/post/post.dto';

export default interface IUnlikePostUsecase {
  execute(postId: string, userId: string): Promise<PostDTO | null>;
}
