export interface QuestionsEntity {
  question: string;
  response: string;
  feedback: string;
  score: number;
}

export interface InterviewAIEntity {
  _id?: string;
  userId?: string;
  startAt?: string;
  endAt?: string;
  overallScore: number;
  contentQualityScore: number;
  communicationScore: number;
  confidenceScore: number;
  strength: string[];
  areasToImprove: string[];
  questions: QuestionsEntity[];
  createdAt?: string;
  updatedAt?: string;
}

export interface InterviewDashboardEntity {
  totalInterviews: number;
  averageScore: number;
  streak: number;
  totalPracticeTime: string;
  performance: { attempt: number; score: number }[];
  history: { title: string; score: number }[];
}
