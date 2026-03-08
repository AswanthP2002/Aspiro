import CommentsDTO from '../../../DTOs/comments.dto';
import UnlikeCommentDTO from '../../../DTOs/user/unlikeComment.dto';

export default interface IUnlikeCommentUsecase {
  execute(dto: UnlikeCommentDTO): Promise<CommentsDTO | null>;
}
