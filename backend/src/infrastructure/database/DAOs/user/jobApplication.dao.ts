import { model } from 'mongoose';
import JobApplication from '../../../../domain/entities/user/jobApplication.entity';
import { JobApplicationSchema } from '../../Schemas/user/jobApplication.schema';

export const JobApplicationDAO = model<JobApplication>(
  'jobApplication',
  JobApplicationSchema
);
