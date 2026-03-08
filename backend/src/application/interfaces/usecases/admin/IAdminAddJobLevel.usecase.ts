import JobLevelDTO, { CreateJobLevelDTO } from '../../../DTOs/admin/jobLevel.dto';

export default interface IAdminAddJobLevelUsecase {
  execute(dto: CreateJobLevelDTO): Promise<JobLevelDTO | null>;
}
