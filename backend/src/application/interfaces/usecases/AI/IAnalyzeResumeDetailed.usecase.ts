import DetailedResumeAnalysisAiDTO from '../../../DTOs/resume/DetailedResumeAnalysis.ai.dto';

export default interface IAnalyzeResumeDetailedUsecase {
  execute(resumeData: string, targettedRole: string): Promise<DetailedResumeAnalysisAiDTO | null>;
}
