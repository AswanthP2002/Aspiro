import { model } from "mongoose";
import Recruiter from "../../../../domain/entities/recruiter/recruiter";
import { RecruiterSchema } from "../../Schemas/recruiter/recruiter.schema";

export const RecruiterDAO = model<Recruiter>('recruiter', RecruiterSchema)