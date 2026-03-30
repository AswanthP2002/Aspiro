import IJobRepo from '../../../domain/interfaces/IJobRepo';
import ICreateJobUseCase from '../../interfaces/usecases/job/ICreateJob.usecase';
import CreateJobDTO, { JobDTO } from '../../DTOs/job/createJob.dto';
import mapToJobFromCreateJobDTO from '../../mappers/job/mapToJobFromCreateJobDTO.mapper';
import { inject, injectable } from 'tsyringe';
import JobMapper from '../../mappers/job/Job.mapperClass';

@injectable()
export default class CreateJobUseCase implements ICreateJobUseCase {
  constructor(
    @inject('IJobRepository') private _jobRepo: IJobRepo,
    @inject('JobMapper') private _mapper: JobMapper
  ) {}

  async execute(createjobDto: CreateJobDTO): Promise<JobDTO | null> {
    const newJob = mapToJobFromCreateJobDTO(createjobDto);
    const result = await this._jobRepo.create(newJob);

    if (result) {
      const dto = this._mapper.jobEntityToJobDTO(result);
      return dto;
    }

    return null;
  }
}
