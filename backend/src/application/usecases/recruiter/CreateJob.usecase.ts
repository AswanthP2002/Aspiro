import IJobRepo from '../../../domain/interfaces/IJobRepo';
import ICreateJobUseCase from '../../interfaces/usecases/recruiter/ICreateJob.usecase';
import CreateJobDTO, { JobDTO } from '../../DTOs/recruiter/createJob.dto';
import mapToJobFromCreateJobDTO from '../../mappers/recruiter/mapToJobFromCreateJobDTO.mapper';
import mapToJobDTOFromJob from '../../mappers/recruiter/mapToJobDTOFromJob.mapper';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class CreateJobUseCase implements ICreateJobUseCase {
  constructor(@inject('IJobRepository') private _jobRepo: IJobRepo) {}

  async execute(createjobDto: CreateJobDTO): Promise<JobDTO | null> {
    const newJob = mapToJobFromCreateJobDTO(createjobDto);
    const result = await this._jobRepo.create(newJob);

    if (result) {
      const dto = mapToJobDTOFromJob(result);
      return dto;
    }

    return null;
  }
}
