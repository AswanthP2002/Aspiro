import { inject, injectable } from 'tsyringe';
import IAiInterviewUsecase from '../../interfaces/usecases/AI/IAiInterview.usecase';
import IAiServices from '../../interfaces/services/IAiServices';
import AiInterviewResultDTO from '../../DTOs/interview/interview.ai.dto';
import IInterviewAiResultRepo from '../../../domain/entities/interview/interview.ai.result.repo';
import InterviewAIMapper from '../../mappers/Interview-AI/InterviewAi.mapperClass';
import { redisClient } from '../../../infrastructure/redis/redisClient';

@injectable()
export default class AiInterviewUsecase implements IAiInterviewUsecase {
  constructor(
    @inject('IAiServices') private _aiServices: IAiServices,
    @inject('IInterviewAiResultRepository') private _repo: IInterviewAiResultRepo,
    @inject('InterviewAIMapper') private _mapper: InterviewAIMapper
  ) {}

  async execute(
    persona: { role: 'system' | 'user' | 'assistant'; content: string }[],
    isStoped: boolean,
    userId: string
  ): Promise<string | AiInterviewResultDTO> {
    //before results, need to manage interview starting time
    //1) check if startTime already defined in redis
    const startTime = await redisClient.get('startTime');
    if (!startTime) {
      const now = new Date();
      await redisClient.set('startTime', now.toISOString(), { EX: 3600 });
    }
    const result = await this._aiServices.aiInterview(persona, isStoped);
    //save result into database only if it is final result not ongoing interview
    if (isStoped) {
      // const startTimeToString = startTime as string
      const finalResult = result as AiInterviewResultDTO;
      const newResult = this._mapper.interviewAIdtoToEntity({
        ...finalResult,
        userId,
        startTime: startTime as string,
        endTime: new Date().toISOString(),
      });
      await this._repo.create(newResult);
      //remove start tiem from redis server
      await redisClient.del('startTime');
      // console.log('-- Checking final result before storing', result)
      // this._repo.create(result);
    }
    return result;
  }
}
