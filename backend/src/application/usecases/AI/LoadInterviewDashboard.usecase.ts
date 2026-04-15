import { inject, injectable } from 'tsyringe';
import ILoadInterviewDashboardUsecase from '../../interfaces/usecases/AI/ILoadInterviewDashboard.usecase';
import IInterviewAiResultRepo from '../../../domain/entities/interview/interview.ai.result.repo';
import InterviewDashboardValuesDTO from '../../DTOs/interview/interviewDashboardValues';

@injectable()
export default class LoadInterviewDashboard implements ILoadInterviewDashboardUsecase {
  constructor(@inject('IInterviewAiResultRepository') private _repo: IInterviewAiResultRepo) {}

  async execute(userId: string): Promise<InterviewDashboardValuesDTO | null> {
    const result = await this._repo.getUserInterviewDashboard(userId);
    return result ? result : null;
  }
}
