import CancelSubscriptionDTO from '../../../DTOs/subscription/CancelSubscription.dto';
import UserSubscriptionDTO from '../../../DTOs/subscription/userSubscription.dto';

export default interface IUserCancelSubscriptionUsecase {
  execute(dto: CancelSubscriptionDTO): Promise<UserSubscriptionDTO | null>;
}
