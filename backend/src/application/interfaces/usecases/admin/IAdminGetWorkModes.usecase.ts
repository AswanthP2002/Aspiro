import { GetWorkModsDTO, PaginatedWorkModesDTO } from '../../../DTOs/admin/workMode.dto';

export interface IAdminGetWorkModesUsecase {
  execute(dto: GetWorkModsDTO): Promise<PaginatedWorkModesDTO | null>;
}
