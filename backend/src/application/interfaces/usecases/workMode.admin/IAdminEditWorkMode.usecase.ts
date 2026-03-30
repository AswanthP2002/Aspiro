import WorkModeDTO, { EditWorkModeDTO } from '../../../DTOs/workMode.admin/workMode.dto';

export default interface IAdminEditWorkModeUsecase {
  execute(dto: EditWorkModeDTO): Promise<WorkModeDTO | null>;
}
