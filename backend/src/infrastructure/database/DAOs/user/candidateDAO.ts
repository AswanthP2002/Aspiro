import { model } from 'mongoose';
import { CandidateSchema } from '../../Schemas/user/candidate.shcema';
import Candidate from '../../../../domain/entities/user/candidate.entity.GARBAGE';

export const CandidateDAO = model<Candidate>('candidate', CandidateSchema);
