import { model } from 'mongoose';
import Comments from '../../../domain/entities/comment/comments.entity';
import { CommentSchema } from '../Schemas/comments.schema';

export const CommentDAO = model<Comments>('comment', CommentSchema);
