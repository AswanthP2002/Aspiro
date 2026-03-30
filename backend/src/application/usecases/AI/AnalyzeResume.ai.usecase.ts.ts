import { inject, injectable } from 'tsyringe';
import IAnalyzeResumeUsecase from '../../interfaces/usecases/AI/IAnalyzeResume.ai.usecase';
import IAiServices from '../../interfaces/services/IAiServices';

@injectable()
export default class AnalyzeResumeUsecase implements IAnalyzeResumeUsecase {
  constructor(@inject('IAiServices') private _aiService: IAiServices) {}

  async execute(
    resumeData: any,
    targetedRole: string
  ): Promise<{
    score: number;
    strength: string[];
    improvements: string[];
    feedback: string;
  } | null> {
    const stringifiedResumeData = JSON.stringify(resumeData);
    const result = await this._aiService.analyzeResume(stringifiedResumeData, targetedRole);
    if (result) {
      return result;
    }
    return null;
  }
}
