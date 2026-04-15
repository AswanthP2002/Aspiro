import { InterviewAIEntity } from '../../../domain/entities/interview/interview.ai.entity';
import AiInterviewResultDTO from '../../DTOs/interview/interview.ai.dto';

export default class InterviewAIMapper {
  public interviewAIdtoToEntity(
    data: AiInterviewResultDTO & { userId: string; startTime: string; endTime: string } //intersection type: userid merged
  ): InterviewAIEntity {
    return {
      overallScore: data.overall_score,
      contentQualityScore: data.content_quality_score,
      communicationScore: data.communication_score,
      confidenceScore: data.confidence_score,
      strength: data.strengths,
      areasToImprove: data.areas_to_improve,
      questions: data.question_by_question_analysis,
      userId: data.userId,
      startAt: data.startTime,
      endAt: data.endTime,
    };
  }
}
