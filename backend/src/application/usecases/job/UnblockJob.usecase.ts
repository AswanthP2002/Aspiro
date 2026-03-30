import { inject, injectable } from 'tsyringe';
import IJobRepo from '../../../domain/interfaces/IJobRepo';
import IUnblockJobUseCase from '../../interfaces/usecases/job/IUnblockJob.usecase';
import JobMapper from '../../mappers/job/Job.mapperClass';
import { JobDTO } from '../../DTOs/job/createJob.dto';

@injectable()
export class UnblockJobUseCase implements IUnblockJobUseCase {
  constructor(
    @inject('IJobRepository') private _jobRepo: IJobRepo,
    @inject('JobMapper') private mapper: JobMapper
  ) {}

  async execute(id: string): Promise<JobDTO | null> {
    const result = await this._jobRepo.update(id, { status: 'active' });
    return result ? this.mapper.jobEntityToJobDTO(result) : null;
  }
}
