import JobLevelDTO, { UpdateJobLevelDTO } from '../../../DTOs/admin/jobLevel.dto';

export default interface IAdminEditJobLevelUsecase {
  execute(dto: UpdateJobLevelDTO): Promise<JobLevelDTO | null>;
}
