import { SubscribeFreePlanDTO } from '../../../DTOs/subscription/subscribeFreePlan.dto';
import UserSubscriptionDTO from '../../../DTOs/subscription/userSubscription.dto';

export default interface IUserSubscribeFreePlanUsecase {
  execute(dto: SubscribeFreePlanDTO): Promise<UserSubscriptionDTO | null>;
}
