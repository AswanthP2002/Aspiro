import { model, Schema } from 'mongoose';
import JobType from '../../../../domain/entities/jobType/jobType.entity';

export const JobTypeSchema = new Schema<JobType>(
  {
    name: { type: String },
    slug: { type: String },
    isActive: { type: Boolean },
  },
  { timestamps: true }
);

export const JobTypeDAO = model<JobType>('jobtype', JobTypeSchema);
