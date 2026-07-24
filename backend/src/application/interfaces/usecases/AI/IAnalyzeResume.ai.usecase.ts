export default interface IAnalyzeResumeUsecase {
  execute(
    resumeData: string | Buffer<ArrayBuffer> | Buffer,
    targetedRole: string
  ): Promise<{
    score: number;
    strength: string[];
    improvements: string[];
    feedback: string;
  } | null>;
}
