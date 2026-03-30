import WorkModeDTO, { ChangeWorkModeStatusDTO } from '../../../DTOs/workMode.admin/workMode.dto';

export interface IAdminChangeWorkModeStatusUsecase {
  execute(dto: ChangeWorkModeStatusDTO): Promise<WorkModeDTO | null>;
}
