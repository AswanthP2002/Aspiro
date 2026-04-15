import mongoose, { model, Schema } from 'mongoose';
import { InterviewAIEntity } from '../../../../domain/entities/interview/interview.ai.entity';
import { QuestionsEntity } from '../../../../domain/entities/interview/interview.ai.entity';

const QuestionsSchema = new Schema<QuestionsEntity>({
  question: { type: String },
  response: { type: String },
  feedback: { type: String },
  score: { type: Number },
});

export const InterviewAiResultSchema = new Schema<InterviewAIEntity>(
  {
    overallScore: { type: Number },
    userId: { type: mongoose.Types.ObjectId },
    contentQualityScore: { type: Number },
    communicationScore: { type: Number },
    confidenceScore: { type: Number },
    strength: { type: [String] },
    areasToImprove: { type: [String] },
    questions: { type: [QuestionsSchema] },
    startAt: { type: Date },
    endAt: { type: Date },
  },
  { timestamps: true }
);

export const InterviewAIResultModel = model<InterviewAIEntity>(
  'interviewAi',
  InterviewAiResultSchema
);
