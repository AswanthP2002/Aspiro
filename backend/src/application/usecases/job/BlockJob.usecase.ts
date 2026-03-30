import { inject, injectable } from 'tsyringe';
import IJobRepo from '../../../domain/interfaces/IJobRepo';
import { JobDTO } from '../../DTOs/job/createJob.dto';
import IBlockJobUseCase from '../../interfaces/usecases/job/IBlockJob.usecase';
import JobMapper from '../../mappers/job/Job.mapperClass';

@injectable()
export class BlockJobUseCase implements IBlockJobUseCase {
  constructor(
    @inject('IJobRepository') private _jobRepo: IJobRepo,
    @inject('JobMapper') private _mapper: JobMapper
  ) {}

  async execute(id: string): Promise<JobDTO | null> {
    const result = await this._jobRepo.update(id, { status: 'blocked' });
    return result ? this._mapper.jobEntityToJobDTO(result) : null;
  }
}
