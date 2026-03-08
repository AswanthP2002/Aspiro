import { model, Schema } from 'mongoose';
import SkillSet from '../../../domain/entities/skills.entity';

export const SkillSetSchema = new Schema<SkillSet>({
  skills: { type: String },
  isVerified: { type: Boolean, default: true },
});

export const SkillSetDAO = model<SkillSet>('skillSets', SkillSetSchema);
