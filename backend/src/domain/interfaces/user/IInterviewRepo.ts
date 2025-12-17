import CreateInterviewDTO, { InterviewDTO } from "../../../application/DTOs/user/interview.dto";
import Interviews from "../../entities/user/interview.entity";
import IBaseRepo from "../IBaseRepo";

export default interface IInterviewRepo extends IBaseRepo<Interviews> {
}