export default interface InterviewDashboardValuesDTO {
  totalInterviews: number;
  averageScore: number;
  streak: number;
  totalPracticeTime: string;
  performance: { attempt: number; score: number }[];
  history: { title: string; score: number }[];
}
