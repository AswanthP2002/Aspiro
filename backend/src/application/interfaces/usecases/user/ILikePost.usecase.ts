import { PostDTO } from '../../../DTOs/post.dto';
import LikePostDTO from '../../../DTOs/user/likePost.dto';

export default interface ILikePostUsecase {
  execute(dto: LikePostDTO): Promise<PostDTO | null>;
}
