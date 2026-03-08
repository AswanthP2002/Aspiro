import Comments from '../entities/user/comments.entity';
import IBaseRepo from './IBaseRepo';

export default interface ICommentRepository extends IBaseRepo<Comments> {
  increaseCommentLike(commentId: string): Promise<Comments | null>;
  decreaseCommentLike(commentId: string): Promise<Comments | null>;
}
