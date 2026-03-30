import { SubscriptionAnalyticsDTO } from '../../../DTOs/subscription/subscriptionAnalytics.dto';

export default interface IAdminGetAnalyticsUsecase {
  execute(
    search: string,
    page: number,
    limit: number,
    status: string
  ): Promise<{ data: SubscriptionAnalyticsDTO; totalPages: number } | null>;
}
