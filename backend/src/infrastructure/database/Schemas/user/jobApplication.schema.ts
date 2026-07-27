import { Schema } from 'mongoose';
import JobApplication from '../../../../domain/entities/jobApplication/jobApplication.entity';

export const JobApplicationSchema = new Schema<JobApplication>(
  {
    candidateId: {
      type: Schema.Types.ObjectId,
      ref: 'candidates',
      required: true,
    },
    jobId: { type: Schema.Types.ObjectId, ref: 'jobs', required: true },
    recruiterId: { type: Schema.Types.ObjectId, ref: 'recruiters' },
    companyId: { type: Schema.Types.ObjectId, ref: 'companies' },
    coverLetterContent: { type: String },
    resumeId: { type: Schema.Types.ObjectId, ref: 'resumes', required: true },
    withdrawReason: { type: String, required: false },
    status: {
      type: String,
      enum: [
        'applied',
        'opened',
        'screening',
        'interview',
        'offer',
        'rejected',
        'hired',
        'withdrawn',
      ],
      default: 'applied',
    },
    notes: { type: String },
  },
  { timestamps: true }
);
