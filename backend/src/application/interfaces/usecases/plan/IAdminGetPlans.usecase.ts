import { AdminGetPlanRequestDTO, PlanDTO } from '../../../DTOs/plan/plan.dto';

export default interface IAdminGetPlansUsecase {
  execute(dto: AdminGetPlanRequestDTO): Promise<{ plans: PlanDTO[]; totalPages: number } | null>;
}
