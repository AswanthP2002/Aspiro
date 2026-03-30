import CreateJobDTO, { JobDTO } from '../../../DTOs/job/createJob.dto';

export default interface ICreateJobUseCase {
  execute(createJobDto: CreateJobDTO): Promise<JobDTO | null>;
}
