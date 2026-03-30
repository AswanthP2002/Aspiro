import mongoose from 'mongoose';
import Comments from '../../domain/entities/comment/comments.entity';
import ICommentRepository from '../../domain/interfaces/IComment.repository';
import { CommentDAO } from '../database/DAOs/comments.dao';
import BaseRepository from './baseRepository';

export default class CommentRepository
  extends BaseRepository<Comments>
  implements ICommentRepository
{
  constructor() {
    super(CommentDAO);
  }

  async increaseCommentLike(commentId: string): Promise<Comments | null> {
    if (!mongoose.isValidObjectId(commentId)) return null;

    const result = await CommentDAO.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(commentId) },
      { $inc: { likes: 1 } },
      { returnDocument: 'after' }
    );

    return result;
  }

  async decreaseCommentLike(commentId: string): Promise<Comments | null> {
    if (!mongoose.isValidObjectId(commentId)) return null;

    const result = await CommentDAO.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(commentId) },
      { $inc: { likes: -1 } },
      { returnDocument: 'after' }
    );

    return result;
  }
}
