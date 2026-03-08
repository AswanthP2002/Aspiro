import { Schema } from 'mongoose';
import Resume from '../../../../domain/entities/user/resume.entity';

export const ResumeSchema = new Schema<Resume>(
  {
    name: { type: String },
    resumePublicIdCloudinary: { type: String },
    resumeUrlCoudinary: { type: String },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'candidates',
      required: true,
    },
    isPrimary: { type: Boolean, default: false },
  },
  { timestamps: true }
);
