import { inject, injectable } from 'tsyringe';
import ILoadUserSubscriptionDetailsUsecase from '../../interfaces/usecases/subscription/ILoadUserSubscriptionDetails.usecase';
import ISubscriptionRepo from '../../../domain/interfaces/plan/ISubscriptionRepo';
import SubscriptionMapper from '../../mappers/subscription/Subscription.mapperClass';
import UserSubscriptionDetailsDTO from '../../DTOs/user/userSubscriptionDetails.dto';

@injectable()
export default class LoadUserSubscriptionDetailsUsecase implements ILoadUserSubscriptionDetailsUsecase {
  constructor(
    @inject('ISubscriptionRepository') private _subscriptionRepo: ISubscriptionRepo,
    @inject('SubscriptionMapper') private _mapper: SubscriptionMapper
  ) {}

  async execute(userId: string): Promise<UserSubscriptionDetailsDTO | null> {
    const result = await this._subscriptionRepo.getUserSubscriptionDetails(userId);
    if (result) {
      return this._mapper.mapUserSubscriptionPlanDetailsToDTO(result);
    }
    return null;
  }
}
