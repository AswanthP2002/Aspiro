import mongoose, { Schema, model } from 'mongoose';
import SavePost from '../../../../domain/entities/post/savePost.entity';

const SavePostSchema = new Schema<SavePost>(
  {
    userId: { type: mongoose.Types.ObjectId, required: true, ref: 'users' },
    postId: { type: mongoose.Types.ObjectId, required: true, ref: 'posts' },
  },
  { timestamps: true }
);

SavePostSchema.index({ userId: 1, postId: 1 }, { unique: true });

export const SavePostModel = model<SavePost>('saved_posts', SavePostSchema);
