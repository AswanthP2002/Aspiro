// import { SubscriptionAnalyticsDTO } from '../../../application/DTOs/subscription/subscriptionAnalytics.dto';
import { SubscriptionAnalyticsData } from '../../entities/plan/subscriptionAnalytics.entity';
import UserSubscription, {
  UserSubscriptionAndPlanDetails,
} from '../../entities/plan/userSubscription.entity';
import IBaseRepo from '../IBaseRepo';

export default interface ISubscriptionRepo extends IBaseRepo<UserSubscription> {
  _placeholder?: never;
  getAdminAnalyticsData(
    search: string,
    page: number,
    limit: number,
    status: string[]
  ): Promise<{ data: SubscriptionAnalyticsData; totalPages: number } | null>;
  getUserSubscriptionDetails(userId: string): Promise<UserSubscriptionAndPlanDetails | null>;
  getSubscriptionAndPlanDetailsBySubscriptionId(
    subscriptionId: string
  ): Promise<UserSubscriptionAndPlanDetails | null>;
  findOneWithUserId(userId: string): Promise<UserSubscription | null>;
  updateFeatureJobApplicationCountByUserId(
    userId: string,
    count: string
  ): Promise<UserSubscription | null>;
  findSubscriptionsByPlanId(planId: string): Promise<UserSubscription[] | null>;
  updateByStripeSubscriptionId(
    stripeSubscriptionId: string,
    data: Partial<UserSubscription>
  ): Promise<UserSubscription | null>;
  findSubscriptionByPlanIdAndUserId(
    userId: string,
    planId: string
  ): Promise<UserSubscription | null>;
  updateFeaturesConnectionRequestCountByUserId(
    userId: string,
    count: string
  ): Promise<UserSubscription | null>;
  updateFeaturesJobCreationCountByUserId(
    userId: string,
    count: string
  ): Promise<UserSubscription | null>;
}
