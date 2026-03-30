import { SubscriptionAnalyticsDTO } from '../../../application/DTOs/subscription/subscriptionAnalytics.dto';
import UserSubscription, { UserSubscriptionAndPlanDetails } from '../../entities/plan/userSubscription.entity';
import IBaseRepo from '../IBaseRepo';

export default interface ISubscriptionRepo extends IBaseRepo<UserSubscription> {
  _placeholder?: never;
  getAdminAnalyticsData(
    search: string,
    page: number,
    limit: number,
    status: string[]
  ): Promise<{ data: SubscriptionAnalyticsDTO; totalPages: number } | null>;
  getUserSubscriptionDetails(userId: string): Promise<UserSubscriptionAndPlanDetails | null>
  findOneWithUserId(userId: string): Promise<UserSubscription | null>
}
