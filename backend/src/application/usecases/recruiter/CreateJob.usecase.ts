import IJobRepo from '../../../domain/interfaces/IJobRepo';
import ICreateJobUseCase from './interface/ICreateJob.usecase';
import CreateJobDTO, { JobDTO } from '../../DTOs/recruiter/createJob.dto';
import mapToJobFromCreateJobDTO from '../../mappers/recruiter/mapToJobFromCreateJobDTO.mapper';
import mapToJobDTOFromJob from '../../mappers/recruiter/mapToJobDTOFromJob.mapper';

export default class CreateJobUseCase implements ICreateJobUseCase {
  constructor(private jobRepo: IJobRepo) {}

  async execute(createjobDto: CreateJobDTO): Promise<JobDTO | null> {
    const newJob = mapToJobFromCreateJobDTO(createjobDto);
    const result = await this.jobRepo.create(newJob);

    if (result) {
      const dto = mapToJobDTOFromJob(result);
      return dto;
    }

    return null;
  }
}
