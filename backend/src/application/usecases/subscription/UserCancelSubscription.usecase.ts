import { inject, injectable } from 'tsyringe';
import IUserCancelSubscriptionUsecase from '../../interfaces/usecases/subscription/ICancelSubscription.usecase';
import { IPlanRepository } from '../../../domain/interfaces/plan/IPlanRepository';
import ISubscriptionRepo from '../../../domain/interfaces/plan/ISubscriptionRepo';
import CancelSubscriptionDTO from '../../DTOs/subscription/CancelSubscription.dto';
import UserSubscriptionDTO from '../../DTOs/subscription/userSubscription.dto';
import IUserRepository from '../../../domain/interfaces/IUserRepo';
import { ResourceNotFound } from '../../../domain/errors/AppError';
import stripe from '../../../infrastructure/services/stripe.service';
import SubscriptionMapper from '../../mappers/subscription/Subscription.mapperClass';

@injectable()
export default class UserCancelSubscriptionUsecase implements IUserCancelSubscriptionUsecase {
  constructor(
    @inject('IPlanRepository') private _planRepository: IPlanRepository,
    @inject('ISubscriptionRepository') private _subscriptionRepo: ISubscriptionRepo,
    @inject('IUserRepository') private _userRepository: IUserRepository,
    @inject('SubscriptionMapper') private _mapper: SubscriptionMapper
  ) {}

  async execute(dto: CancelSubscriptionDTO): Promise<UserSubscriptionDTO | null> {
    const { planId, subscriptionId, userId } = dto;
    console.log(userId);
    const subscriptionDetails = await this._subscriptionRepo.findById(subscriptionId);
    const planDetails = await this._planRepository.findById(planId);
    if (!subscriptionDetails) {
      throw new ResourceNotFound('Subscription');
    }

    if (planDetails?.isTrialPiriodGiven && planDetails.trialPeriod > 0) {
      // since this is a manual cancellation before trial period end db updating as subscription cancelled and ended
      const result = await this._subscriptionRepo.update(subscriptionId, {
        isCanceled: true,
        status: 'cancelled',
      });

      return result ? (result as UserSubscriptionDTO) : null;
    }

    await stripe.subscriptions.update(subscriptionDetails.stripeSubscriptionId as string, {
      cancel_at_period_end: true,
    });

    const result = await this._subscriptionRepo.update(subscriptionId as string, {
      isCanceled: false,
      isCancelAtPeriodEnds: true,
      status: 'cancellation-pending',
    });

    return result ? (result as UserSubscriptionDTO) : null;
  }
}
