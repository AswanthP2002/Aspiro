import { Schema } from 'mongoose';
import JobApplication from '../../../../domain/entities/user/jobApplication.entity';

export const JobApplicationSchema = new Schema<JobApplication>(
  {
    candidateId: {
      type: Schema.Types.ObjectId,
      ref: 'candidates',
      required: true,
    },
    jobId: { type: Schema.Types.ObjectId, ref: 'jobs', required: true },
    coverLetterContent: { type: String },
    resumeId: { type: Schema.Types.ObjectId, ref: 'resumes', required: true },
    status: {
      type: String,
      enum: ['applied', 'opened', 'screening', 'interview', 'offer', 'rejected', 'hired'],
      default: 'applied',
    },
    notes:{type: String}
  },
  { timestamps: true }
);
