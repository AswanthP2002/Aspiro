import { inject, injectable } from 'tsyringe';
import IAdminGetAnalyticsUsecase from '../../interfaces/usecases/plan/IGetAdminAnalytics.usecase';
import ISubscriptionRepo from '../../../domain/interfaces/plan/ISubscriptionRepo';
import { SubscriptionAnalyticsDTO } from '../../DTOs/subscription/subscriptionAnalytics.dto';

@injectable()
export default class AdminGetAnalyticsUsecase implements IAdminGetAnalyticsUsecase {
  constructor(@inject('ISubscriptionRepository') private _repo: ISubscriptionRepo) {}

  async execute(
    search: string,
    page: number,
    limit: number,
    status: string
  ): Promise<{ data: SubscriptionAnalyticsDTO; totalPages: number } | null> {
    let statusType: string[] = ['active', 'canceled', 'incomplete', 'past_due'];
    switch (status) {
      case 'active':
        statusType = ['active'];
        break;
      case 'canceled':
        statusType = ['canceled'];
        break;
      case 'incomplete':
        statusType = ['incomplete'];
        break;
      case 'pastDue':
        statusType = ['past_due'];
        break;
      default:
        statusType = ['active', 'canceled', 'incomplete', 'past_due'];
    }

    const result = await this._repo.getAdminAnalyticsData(search, page, limit, statusType);
    if (result) {
      return { data: result.data as SubscriptionAnalyticsDTO, totalPages: result.totalPages };
    }

    return null;
  }
}
