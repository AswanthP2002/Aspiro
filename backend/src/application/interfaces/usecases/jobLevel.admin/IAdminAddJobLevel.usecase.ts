import JobLevelDTO, { CreateJobLevelDTO } from '../../../DTOs/job.level.admin/jobLevel.dto';

export default interface IAdminAddJobLevelUsecase {
  execute(dto: CreateJobLevelDTO): Promise<JobLevelDTO | null>;
}
