import { model } from 'mongoose';
import Comments from '../../../domain/entities/user/comments.entity';
import { CommentSchema } from '../Schemas/comments.schema';

export const CommentDAO = model<Comments>('comment', CommentSchema);
