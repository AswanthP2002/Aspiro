import IJobRepo from '../../../domain/interfaces/IJobRepo';
import ILoadJobDetailsCandidateSideUseCase from './interface/ILoadJobDetailsCandidateSide.usecase';

export default class LoadJobDetailsCandidateSide
  implements ILoadJobDetailsCandidateSideUseCase
{
  constructor(private _jobRepo: IJobRepo) {}

  async execute(jobId: string): Promise<any> {
    const result = await this._jobRepo.getJobDetails(jobId);
    return result;
  }
} /// this file is also being replaced by a new file comonly for admin,candidate/recruter
//new file is created under usecase folder
