import { inject, injectable } from 'tsyringe';
import { SubscribeFreePlanDTO } from '../../DTOs/subscription/subscribeFreePlan.dto';
import UserSubscriptionDTO from '../../DTOs/subscription/userSubscription.dto';
import IUserSubscribeFreePlanUsecase from '../../interfaces/usecases/subscription/IUser.subscribe.freePlan.usecase';
import ISubscriptionRepo from '../../../domain/interfaces/plan/ISubscriptionRepo';
import { IPlanRepository } from '../../../domain/interfaces/plan/IPlanRepository';

@injectable()
export default class UserSubscribeFreePlanUsecase implements IUserSubscribeFreePlanUsecase {
  constructor(
    @inject('ISubscriptionRepository') private _subscriptionRepo: ISubscriptionRepo,
    @inject('IPlanRepository') private _planRepo: IPlanRepository
  ) {}

  async execute(dto: SubscribeFreePlanDTO): Promise<UserSubscriptionDTO | null> {
    const { planId, userId } = dto;
    const planDetails = await this._planRepo.findById(planId);
    const planFeatures = planDetails?.featuresListed;
    const result = await this._subscriptionRepo.create({
      planId,
      userId,
      status: 'active',
      features: planFeatures,
    });
    return result ? (result as UserSubscriptionDTO) : null;
  }
}
