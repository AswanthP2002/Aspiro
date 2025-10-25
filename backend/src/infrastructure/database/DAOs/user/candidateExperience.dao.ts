import { model } from 'mongoose';
import Experience from '../../../../domain/entities/user/experience.entity';
import { ExperienceSchema } from '../../Schemas/user/userExperience.schema';

export const experienceDAO = model<Experience>(
  'experience',
  ExperienceSchema
);
