export default interface IAnalyzeResumeUsecase {
  execute(
    resumeData: any,
    targetedRole: string
  ): Promise<{
    score: number;
    strength: string[];
    improvements: string[];
    feedback: string;
  } | null>;
}
