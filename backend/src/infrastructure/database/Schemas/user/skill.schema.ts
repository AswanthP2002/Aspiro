import { Schema } from 'mongoose';
import Skills from '../../../../domain/entities/user/skills.entity';

export const SkillSchema = new Schema<Skills>(
  {
    skill: { type: String },
    skillType: { type: String },
    skillLevel: { type: String },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
  },
  { timestamps: true }
);
