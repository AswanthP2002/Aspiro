import mongoose, { Schema } from 'mongoose';
import HidePost from '../../../../domain/entities/user/hidePost.entity';

export const HidePostSchema = new Schema<HidePost>(
  {
    userId: { type: mongoose.Types.ObjectId, required: true },
    postId: { type: mongoose.Types.ObjectId, required: true },
  },
  { timestamps: true }
);

export const HidePostModel = mongoose.model<HidePost>('hidepost', HidePostSchema);
