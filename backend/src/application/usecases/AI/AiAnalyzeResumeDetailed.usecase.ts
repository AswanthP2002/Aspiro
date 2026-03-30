import { inject, injectable } from 'tsyringe';
import IAnalyzeResumeDetailedUsecase from '../../interfaces/usecases/AI/IAnalyzeResumeDetailed.usecase';
import IAiServices from '../../interfaces/services/IAiServices';
import DetailedResumeAnalysisAiDTO from '../../DTOs/resume/DetailedResumeAnalysis.ai.dto';

@injectable()
export default class AnalyzeResumeDetailedUsecase implements IAnalyzeResumeDetailedUsecase {
  constructor(@inject('IAiServices') private _aiServices: IAiServices) {}

  async execute(
    resumeData: string,
    targettedRole: string
  ): Promise<DetailedResumeAnalysisAiDTO | null> {
    const result = await this._aiServices.analyzeDetailedResumes(resumeData, targettedRole);
    if (result) {
      return result;
    }
    return null;
  }
}
