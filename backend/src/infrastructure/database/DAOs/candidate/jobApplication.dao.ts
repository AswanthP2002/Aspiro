import { model } from "mongoose";
import JobApplication from "../../../../domain/entities/candidate/jobApplication";
import { JobApplicationSchema } from "../../Schemas/candidate/jobApplication.schema";

export const JobApplicationDAO = model<JobApplication>('jobApplication', JobApplicationSchema)