import WorkModeDTO, { ChangeWorkModeStatusDTO } from '../../../DTOs/admin/workMode.dto';

export interface IAdminChangeWorkModeStatusUsecase {
  execute(dto: ChangeWorkModeStatusDTO): Promise<WorkModeDTO | null>;
}
