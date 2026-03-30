import CreateInterviewDTO, { InterviewDTO } from '../../../DTOs/interview/interview.dto';

export default interface IScheduleInterviewUsecase {
  execute(interviewData: CreateInterviewDTO): Promise<InterviewDTO | null>;
}
