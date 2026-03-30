import { inject, injectable } from 'tsyringe';
import IJobRepo from '../../../domain/interfaces/IJobRepo';
import JobMapper from '../../mappers/job/Job.mapperClass';
import { JobDTO } from '../../DTOs/job/createJob.dto';
import IAdminToggleFlagJobUsecase from '../../interfaces/usecases/job/IAdminToggleFlagJob.usecase';

@injectable()
export default class AdminToggleFlagJobUsecase implements IAdminToggleFlagJobUsecase {
  constructor(
    @inject('IJobRepository') private _repo: IJobRepo,
    @inject('JobMapper') private _mapper: JobMapper
  ) {}

  async execute(jobId: string, action: 'flag' | 'un-flag'): Promise<JobDTO | null> {
    if (action === 'flag') {
      const result = await this._repo.update(jobId, { isFlagged: true });
      return result ? this._mapper.jobEntityToJobDTO(result) : null;
    } else {
      const result = await this._repo.update(jobId, { isFlagged: false });
      return result ? this._mapper.jobEntityToJobDTO(result) : null;
    }
  }
}
