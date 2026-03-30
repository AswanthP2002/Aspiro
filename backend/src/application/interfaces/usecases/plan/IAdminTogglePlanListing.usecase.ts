import { AdminTogglePlanListingRequestDTO, PlanDTO } from '../../../DTOs/plan/plan.dto';

export interface IAdminTogglePlanListingUsecase {
  execute(dto: AdminTogglePlanListingRequestDTO): Promise<PlanDTO | null>;
}
