import WorkModeDTO from '../../../DTOs/admin/workMode.dto';

export default interface IGetWorkModeListsUsecase {
  execute(): Promise<WorkModeDTO[] | null>;
}
