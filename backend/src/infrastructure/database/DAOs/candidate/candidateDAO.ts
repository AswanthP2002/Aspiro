import { model } from 'mongoose';
import { CandidateSchema } from '../../Schemas/candidate/candidate.shcema';
import Candidate from '../../../../domain/entities/candidate/candidate.entity';

export const CandidateDAO = model<Candidate>('candidate', CandidateSchema);
