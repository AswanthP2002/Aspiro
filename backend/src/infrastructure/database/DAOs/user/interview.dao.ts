import { model } from "mongoose";
import Interviews from "../../../../domain/entities/user/interview.entity";
import { IntervivewSchema } from "../../Schemas/user/interview.schema";

export const InterviewDAO = model<Interviews>('interview', IntervivewSchema)