import mongoose, { model } from "mongoose";
import { CandidateDocuemnt, CandidateSchema } from "../../Schemas/candidate/candidate.shcema";
import Candidate from "../../../../domain/entities/candidate/candidates";
import { Document } from "mongoose";
const {ObjectId} = mongoose.Types

export const CandidateDAO = model<Candidate>('candidate', CandidateSchema)
