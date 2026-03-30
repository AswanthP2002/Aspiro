import WorkModeDTO from '../../../DTOs/workMode.admin/workMode.dto';

export default interface IGetWorkModeListsUsecase {
  execute(): Promise<WorkModeDTO[] | null>;
}
