import IJobRepo from '../../../domain/interfaces/IJobRepo';
import JobAggregatedDTO from '../../DTOs/job/jobDetails.dto.FIX';
import ILoadJobDetailsUseCase from './interfaces/ILoadJobDetails.usecase';

export class LoadJobDetailsUseCase implements ILoadJobDetailsUseCase {
  constructor(private _jobRepo: IJobRepo) {}

  async execute(id: string): Promise<JobAggregatedDTO | null> {
    const result = await this._jobRepo.getJobDetails(id);
    return result;
  }
}
