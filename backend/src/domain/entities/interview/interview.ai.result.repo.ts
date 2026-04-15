import IBaseRepo from '../../interfaces/IBaseRepo';
import { InterviewAIEntity, InterviewDashboardEntity } from './interview.ai.entity';

export default interface IInterviewAiResultRepo extends IBaseRepo<InterviewAIEntity> {
  _placeholder?: never;
  getUserInterviewDashboard(userId: string): Promise<InterviewDashboardEntity | null>
}
