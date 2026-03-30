import { model, Schema } from 'mongoose';
import JobLevel from '../../../../domain/entities/jobLevel/jobLevel.entity';

export const JobLevelSchema = new Schema<JobLevel>(
  {
    name: { type: String, required: true },
    slug: { type: String },
    isActive: { type: Boolean },
  },
  { timestamps: true }
);

export const JobLevelDAO = model<JobLevel>('joblevel', JobLevelSchema);
