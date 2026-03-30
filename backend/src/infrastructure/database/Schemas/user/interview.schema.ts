import { Schema } from 'mongoose';
import Interviews from '../../../../domain/entities/interview/interview.entity';

export const IntervivewSchema = new Schema<Interviews>(
  {
    candidateId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    jobId: { type: Schema.Types.ObjectId, ref: 'jobs', required: true },
    interviewersName: { type: String },
    interviewType: { type: String, enum: ['Technical', 'HR', 'General', 'Managerial'] },
    interviewDate: { type: Date },
    interviewTime: { type: String },
    gmeetUrl: { type: String },
    note: { type: String },
    status: { type: String, enum: ['Scheduled', 'Completed', 'Cancelled'], default: 'Scheduled' },
  },
  { timestamps: true }
);
