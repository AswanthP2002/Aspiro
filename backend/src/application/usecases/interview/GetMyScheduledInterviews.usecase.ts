import { inject, injectable } from 'tsyringe';
import { IGetMyScheduledInterviewsUsecase } from '../../interfaces/usecases/interview/IGetMyScheduledInterviews.usecase';
import IInterviewRepo from '../../../domain/interfaces/user/IInterviewRepo';
import { InterviewDTO } from '../../DTOs/interview/interview.dto';

@injectable()
export default class GetMyScheduledInterviewsUsecase implements IGetMyScheduledInterviewsUsecase {
  constructor(@inject('IInterviewRepository') private _repo: IInterviewRepo) {}

  async execute(candidateId: string): Promise<InterviewDTO[] | null> {
    const result = await this._repo.getCandidateInterviewsByCandidateId(candidateId);
    return result as InterviewDTO[];
  }
}
