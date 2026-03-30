import { SubscribePaidPlanDTO } from '../../../DTOs/subscription/subscribeFreePlan.dto';

export default interface IUserSubscribePaidPlanUsecase {
  execute(dto: SubscribePaidPlanDTO): Promise<string>;
}

