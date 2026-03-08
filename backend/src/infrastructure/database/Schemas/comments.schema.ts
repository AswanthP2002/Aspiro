import { Schema } from 'mongoose';
import Comments from '../../../domain/entities/user/comments.entity';

export const CommentSchema = new Schema<Comments>(
  {
    postId: { type: Schema.Types.ObjectId, ref: 'posts', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    text: { type: String, required: true },
    depth: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    parentId: { type: Schema.Types.ObjectId, default: null },
    replyCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);
