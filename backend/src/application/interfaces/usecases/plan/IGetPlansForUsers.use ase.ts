import { PlanDTO } from '../../../DTOs/plan/plan.dto';

export default interface IGetPlansForUserUsecase {
  execute(): Promise<PlanDTO[] | null>;
}
