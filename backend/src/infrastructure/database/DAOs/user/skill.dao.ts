import { model } from 'mongoose';
import Skills from '../../../../domain/entities/user/skills.entity';
import { SkillSchema } from '../../Schemas/user/skill.schema';

export const SkillDAO = model<Skills>('skill', SkillSchema);
