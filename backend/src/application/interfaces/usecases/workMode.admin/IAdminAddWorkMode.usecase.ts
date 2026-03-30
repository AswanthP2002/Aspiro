import WorkModeDTO, { CreateWorkModeDTO } from '../../../DTOs/workMode.admin/workMode.dto';

export default interface IAdminAddWorkModeUsecase {
  execute(dto: CreateWorkModeDTO): Promise<WorkModeDTO | null>;
}
