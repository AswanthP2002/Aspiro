import { GetJobLevelsDTO, PaginatedJobLevel } from '../../../DTOs/admin/jobLevel.dto';

export default interface IAdminGetJobLevelsUsecase {
  execute(dto: GetJobLevelsDTO): Promise<PaginatedJobLevel | null>;
}
