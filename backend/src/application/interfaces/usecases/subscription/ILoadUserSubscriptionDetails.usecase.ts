import UserSubscriptionDetailsDTO from '../../../DTOs/user/userSubscriptionDetails.dto';

export default interface ILoadUserSubscriptionDetailsUsecase {
  execute(userId: string): Promise<UserSubscriptionDetailsDTO | null>;
}
