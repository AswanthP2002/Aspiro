import { PostDTO } from '../../../DTOs/post/post.dto';
import LikePostDTO from '../../../DTOs/post/likePost.dto';

export default interface ILikePostUsecase {
  execute(dto: LikePostDTO): Promise<PostDTO | null>;
}
