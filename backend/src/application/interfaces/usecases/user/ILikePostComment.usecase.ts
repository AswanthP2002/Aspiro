import CommentsDTO from '../../../DTOs/comments.dto';
import LikeCommentDTO from '../../../DTOs/user/likecomment.dto';

export default interface ILikePostCommentUsecase {
  execute(dto: LikeCommentDTO): Promise<CommentsDTO | null>;
}
