import CreateJobDTO, { JobDTO } from '../../../DTOs/recruiter/createJob.dto';

export default interface ICreateJobUseCase {
  execute(createJobDto: CreateJobDTO): Promise<JobDTO | null>;
}
