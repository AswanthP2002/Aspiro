import { inject, injectable } from 'tsyringe';
import IAiInterviewUsecase from '../../interfaces/usecases/AI/IAiInterview.usecase';
import IAiServices from '../../interfaces/services/IAiServices';

@injectable()
export default class AiInterviewUsecase implements IAiInterviewUsecase {
  constructor(@inject('IAiServices') private _aiServices: IAiServices) {}

  async execute(
    persona: { role: 'system' | 'user' | 'assistant'; content: string }[],
    isStoped: boolean
  ): Promise<string> {
    const result = await this._aiServices.aiInterview(persona, isStoped);
    return result as string;
  }
}
