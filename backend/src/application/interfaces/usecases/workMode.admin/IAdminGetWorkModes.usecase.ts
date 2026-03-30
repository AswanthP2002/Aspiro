import { GetWorkModsDTO, PaginatedWorkModesDTO } from '../../../DTOs/workMode.admin/workMode.dto';

export interface IAdminGetWorkModesUsecase {
  execute(dto: GetWorkModsDTO): Promise<PaginatedWorkModesDTO | null>;
}
