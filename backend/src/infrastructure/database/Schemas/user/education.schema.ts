import { Schema } from 'mongoose';
import Education from '../../../../domain/entities/user/educations.entity';

export const EducationSchema = new Schema<Education>(
  {
    educationStream: { type: String },
    educationLevel: { type: String },
    institution: { type: String },
    location: { type: String },
    isPresent: { type: Boolean },
    startYear: { type: String },
    endYear: { type: String || null },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
  },
  { timestamps: true }
);
