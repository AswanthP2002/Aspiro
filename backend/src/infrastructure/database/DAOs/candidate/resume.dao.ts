import { model } from 'mongoose';
import Resume from '../../../../domain/entities/candidate/resume.entity';
import { ResumeSchema } from '../../Schemas/candidate/resume.schema';

export const ResumeDAO = model<Resume>('resume', ResumeSchema);
