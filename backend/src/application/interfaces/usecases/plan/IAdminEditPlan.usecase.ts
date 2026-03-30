import { EditPlanDTO, PlanDTO } from '../../../DTOs/plan/plan.dto';

export default interface IAdminEditPlanUsecase {
  execute(dto: EditPlanDTO): Promise<PlanDTO | null>;
}
