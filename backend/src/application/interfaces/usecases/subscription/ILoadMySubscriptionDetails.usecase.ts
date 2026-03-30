import { UserSubscriptionAndPlanDetailsDTO } from '../../../DTOs/subscription/userSubscription.dto';

export default interface ILoadMySubscriptionDetailsUsecase {
  execute(userId: string): Promise<UserSubscriptionAndPlanDetailsDTO | null>;
}
