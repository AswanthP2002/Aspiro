import { inject, injectable } from 'tsyringe';
import { SubscribeFreePlanDTO } from '../../DTOs/subscription/subscribeFreePlan.dto';
import UserSubscriptionDTO from '../../DTOs/subscription/userSubscription.dto';
import IUserSubscribeFreePlanUsecase from '../../interfaces/usecases/subscription/IUser.subscribe.freePlan.usecase';
import ISubscriptionRepo from '../../../domain/interfaces/plan/ISubscriptionRepo';
import { IPlanRepository } from '../../../domain/interfaces/plan/IPlanRepository';
import IUserRepository from '../../../domain/interfaces/IUserRepo';

@injectable()
export default class UserSubscribeFreePlanUsecase implements IUserSubscribeFreePlanUsecase {
  constructor(
    @inject('ISubscriptionRepository') private _subscriptionRepo: ISubscriptionRepo,
    @inject('IPlanRepository') private _planRepo: IPlanRepository,
    @inject('IUserRepository') private _userRepo: IUserRepository
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
      planMetaData: {
        name: planDetails?.name as string,
        price: planDetails?.monthlyPrice ?? 0,
      },
    });
    const data: { action: string; date: Date } = {
      action: 'User subscribed free plan',
      date: new Date(),
    };
    await this._userRepo.updateUserSubscriptionData(userId, data);
    return result ? (result as UserSubscriptionDTO) : null;
  }
}
