import { Schema } from 'mongoose';
import JobApplication from '../../../../domain/entities/candidate/jobApplication.entity';

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
      enum: ['applied', 'opened', 'rejected', 'shortlisted'],
      default: 'applied',
    },
  },
  { timestamps: true }
);
