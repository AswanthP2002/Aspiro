import { model } from 'mongoose';
import { NewRecruiter } from '../../../../domain/entities/recruiter/recruiter.entity';
import { RecruiterSchema } from '../../Schemas/recruiter/recruiter.schema';

export const RecruiterDAO = model<NewRecruiter>('recruiter', RecruiterSchema);
