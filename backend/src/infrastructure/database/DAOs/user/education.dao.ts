import { model } from 'mongoose';
import Education from '../../../../domain/entities/user/educations.entity';
import { EducationSchema } from '../../Schemas/user/education.schema';

export const EducationDAO = model<Education>('education', EducationSchema);
