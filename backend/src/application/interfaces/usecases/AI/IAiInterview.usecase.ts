import AiInterviewResultDTO from '../../../DTOs/interview/interview.ai.dto';

export default interface IAiInterviewUsecase {
  execute(
    persona: { role: 'system' | 'user' | 'assistant'; content: string }[],
    isStoped: boolean,
    userId: string
  ): Promise<string | AiInterviewResultDTO>;
}
