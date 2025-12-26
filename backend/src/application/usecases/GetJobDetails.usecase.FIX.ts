import { inject, injectable } from 'tsyringe';
import IJobRepo from '../../domain/interfaces/IJobRepo';
import JobAggregatedDTO from '../DTOs/job/jobDetails.dto.FIX';
import IGetJobDetailsUseCase from './interfaces/IGetJobDetails.usecase.FIX';
import { plainToInstance } from 'class-transformer';

@injectable()
export default class GetJobDetailsUseCase implements IGetJobDetailsUseCase {
  constructor(@inject('IJobRepository') private _repo: IJobRepo) {}

  async execute(jobId: string): Promise<JobAggregatedDTO | null> {
    const result = await this._repo.getJobDetails(jobId);
    if (result) {
      const dto = plainToInstance(JobAggregatedDTO, result);
      return dto;
    }

    return null;
  }
}
