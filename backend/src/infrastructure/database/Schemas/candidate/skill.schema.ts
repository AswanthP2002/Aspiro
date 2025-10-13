import { Schema } from 'mongoose';
import Skills from '../../../../domain/entities/candidate/skills.entity';

export const SkillSchema = new Schema<Skills>(
  {
    skill: { type: String },
    type: { type: String },
    level: { type: String },
    candidateId: {
      type: Schema.Types.ObjectId,
      ref: 'candidates',
      required: true,
    },
  },
  { timestamps: true }
);
