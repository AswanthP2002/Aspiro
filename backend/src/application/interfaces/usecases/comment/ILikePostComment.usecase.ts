import CommentsDTO from '../../../DTOs/comment/comments.dto';
import LikeCommentDTO from '../../../DTOs/comment/likecomment.dto';

export default interface ILikePostCommentUsecase {
  execute(dto: LikeCommentDTO): Promise<CommentsDTO | null>;
}
