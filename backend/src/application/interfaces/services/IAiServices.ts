import DetailedResumeAnalysisAiDTO from '../../DTOs/resume/DetailedResumeAnalysis.ai.dto';

export default interface IAiServices {
  analyzeResume(
    resumeContent: string,
    targetRole: string
  ): Promise<{
    score: number;
    strength: string[];
    improvements: string[];
    feedback: string;
  } | null>;
  analyzeDetailedResumes(
    resumeData: string,
    targettedRole: string
  ): Promise<DetailedResumeAnalysisAiDTO | null>;
}
