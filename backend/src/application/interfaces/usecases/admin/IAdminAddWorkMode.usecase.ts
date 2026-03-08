import WorkModeDTO, { CreateWorkModeDTO } from '../../../DTOs/admin/workMode.dto';

export default interface IAdminAddWorkModeUsecase {
  execute(dto: CreateWorkModeDTO): Promise<WorkModeDTO | null>;
}
