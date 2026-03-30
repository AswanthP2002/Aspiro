import JobLevelDTO, { UpdateJobLevelDTO } from '../../../DTOs/job.level.admin/jobLevel.dto';

export default interface IAdminEditJobLevelUsecase {
  execute(dto: UpdateJobLevelDTO): Promise<JobLevelDTO | null>;
}
