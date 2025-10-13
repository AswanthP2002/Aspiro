import { model } from 'mongoose';
import Experience from '../../../../domain/entities/candidate/experience.entity';
import { CandidateExperienceSchema } from '../../Schemas/candidate/candidateExperience.schema';

export const experienceDAO = model<Experience>(
  'experience',
  CandidateExperienceSchema
);
