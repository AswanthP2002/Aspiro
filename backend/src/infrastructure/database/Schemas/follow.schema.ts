import { Schema } from 'mongoose';
import Follow from '../../../domain/entities/follow.entity';

export const FollowSchema = new Schema<Follow>(
  {
    follower: { type: Schema.Types.ObjectId, required: true },
    following: { type: Schema.Types.ObjectId, required: true },
  },
  { timestamps: true }
);

FollowSchema.index({ follower: 1, followee: 1 }, { unique: true });
