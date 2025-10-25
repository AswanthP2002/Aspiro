import { model } from 'mongoose';
import Resume from '../../../../domain/entities/user/resume.entity';
import { ResumeSchema } from '../../Schemas/user/resume.schema';

export const ResumeDAO = model<Resume>('resume', ResumeSchema);
