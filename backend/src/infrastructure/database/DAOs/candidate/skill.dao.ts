import { model } from 'mongoose';
import Skills from '../../../../domain/entities/candidate/skills.entity';
import { SkillSchema } from '../../Schemas/candidate/skill.schema';

export const SkillDAO = model<Skills>('skill', SkillSchema);
