import { Schema } from 'mongoose';
import Resume from '../../../../domain/entities/candidate/resume.entity';

export const ResumeSchema = new Schema<Resume>(
  {
    resumeFileName: { type: String },
    resumePublicIdCloudinary: { type: String },
    resumeUrlCoudinary: { type: String },
    candidateId: {
      type: Schema.Types.ObjectId,
      ref: 'candidates',
      required: true,
    },
  },
  { timestamps: true }
);
