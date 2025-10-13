import { Schema } from 'mongoose';
import Post from '../../../domain/entities/Post.entity';

export const PostSchema = new Schema<Post>(
  {
    content: { type: String },
    creatorId: { type: Schema.Types.ObjectId },
    creatorType: { type: String, enum: ['candidate', 'recruiter'] },
    likes: { type: [Schema.Types.ObjectId] },
    media: {
      url: { type: String },
      publidId: { type: String },
    },
  },
  { timestamps: true }
);
