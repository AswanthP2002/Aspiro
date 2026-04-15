import InterviewDashboardValuesDTO from '../../../DTOs/interview/interviewDashboardValues';

export default interface ILoadInterviewDashboardUsecase {
  execute(userId: string): Promise<InterviewDashboardValuesDTO | null>;
}
