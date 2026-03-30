import CommentsDTO from '../../../DTOs/comment/comments.dto';
import UnlikeCommentDTO from '../../../DTOs/comment/unlikeComment.dto';

export default interface IUnlikeCommentUsecase {
  execute(dto: UnlikeCommentDTO): Promise<CommentsDTO | null>;
}
