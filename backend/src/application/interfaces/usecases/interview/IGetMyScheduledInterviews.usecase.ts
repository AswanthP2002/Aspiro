import { InterviewDTO } from '../../../DTOs/interview/interview.dto';

export interface IGetMyScheduledInterviewsUsecase {
  execute(candidateId: string): Promise<InterviewDTO[] | null>;
}
