import { CreatePlanDTO, PlanDTO } from '../../../DTOs/plan/plan.dto';

export default interface ICreatePlanUsecase {
  execute(dto: CreatePlanDTO): Promise<PlanDTO | null>;
}
