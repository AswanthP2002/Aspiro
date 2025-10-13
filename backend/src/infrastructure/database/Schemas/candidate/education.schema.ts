import { Schema } from 'mongoose';
import Education from '../../../../domain/entities/candidate/educations.entity';

export const EducationSchema = new Schema<Education>(
  {
    stream: { type: String },
    level: { type: String },
    organization: { type: String },
    location: { type: String },
    isPresent: { type: Boolean },
    startYear: { type: String },
    endYear: { type: String || null },
    candidateId: {
      type: Schema.Types.ObjectId,
      ref: 'candidates',
      required: true,
    },
  },
  { timestamps: true }
);
