import { model } from 'mongoose';
import Education from '../../../../domain/entities/candidate/educations.entity';
import { EducationSchema } from '../../Schemas/candidate/education.schema';

export const EducationDAO = model<Education>('education', EducationSchema);
