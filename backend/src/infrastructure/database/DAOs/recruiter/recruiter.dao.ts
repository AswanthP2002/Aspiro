import { model } from 'mongoose';
import Recruiter from '../../../../domain/entities/recruiter/recruiter.entity';
import { RecruiterSchema } from '../../Schemas/recruiter/recruiter.schema';

export const RecruiterDAO = model<Recruiter>('recruiter', RecruiterSchema);
