import { Schema } from 'mongoose';
import Experience from '../../../../domain/entities/user/experience.entity';

export const ExperienceSchema = new Schema<Experience>(
  {
    userId:{type:Schema.Types.ObjectId, ref:'users', required:true},
    jobRole: { type: String },
    organization: { type: String },
    location: { type: String },
    workMode: { type: String },
    jobType: { type: String },
    isPresent: { type: Boolean },
    startDate: { type: Date },
    endDate: { type: Date },
  },
  { timestamps: true }
);
