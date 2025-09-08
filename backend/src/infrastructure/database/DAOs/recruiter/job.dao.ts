import { model } from "mongoose";
import Job from "../../../../domain/entities/job";
import { JobSchema } from "../../Schemas/recruiter/job.schema";

export const JobDAO = model<Job>('job', JobSchema)