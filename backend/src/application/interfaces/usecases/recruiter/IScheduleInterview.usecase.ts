import CreateInterviewDTO, { InterviewDTO } from "../../../DTOs/user/interview.dto";

export default interface IScheduleInterviewUsecase {
    execute(interviewData: CreateInterviewDTO): Promise<InterviewDTO | null>
}