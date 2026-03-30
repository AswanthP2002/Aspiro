import { GetJobLevelsDTO, PaginatedJobLevel } from '../../../DTOs/job.level.admin/jobLevel.dto';

export default interface IAdminGetJobLevelsUsecase {
  execute(dto: GetJobLevelsDTO): Promise<PaginatedJobLevel | null>;
}
