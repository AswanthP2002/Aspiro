import { Schema } from 'mongoose';
import Comments from '../../../domain/entities/comments.entity';

export const CommentSchema = new Schema<Comments>(
  {
    postId: { type: Schema.Types.ObjectId, ref: 'posts', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);
