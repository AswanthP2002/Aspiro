import { PlanDTO } from '../../../DTOs/plan/plan.dto';

export default interface IAdminDeletePlanUsecase {
  execute(planId: string): Promise<PlanDTO | null>;
}
