import { inject, injectable } from 'tsyringe';
import ISubscriptionRepo from '../../../domain/interfaces/plan/ISubscriptionRepo';
import { IPlanRepository } from '../../../domain/interfaces/plan/IPlanRepository';
import IUpgradeSubscriptionUsecase from '../../interfaces/usecases/subscription/IUpgradeSubscription.usecase';
import UpgradeSubscriptionDTO from '../../DTOs/subscription/UpgradeSubscription.DTO';
import { ResourceNotFound } from '../../../domain/errors/AppError';
import IPaymentServices from '../../interfaces/services/IPayment.services';
import IUserRepository from '../../../domain/interfaces/IUserRepo';

@injectable()
export default class UpgradeSubscriptionUsecase implements IUpgradeSubscriptionUsecase {
  constructor(
    @inject('ISubscriptionRepository') private _subscriptionRepo: ISubscriptionRepo,
    @inject('IPlanRepository') private _planRepository: IPlanRepository,
    @inject('StripePaymentGateway') private _paymentGateway: IPaymentServices,
    @inject('IUserRepository') private _userRepo: IUserRepository
  ) {}

  async execute(
    dto: UpgradeSubscriptionDTO
  ): Promise<{ id: string; status: string } | string | null> {
    const { userId, upgradingPlanId, currentSubscriptionId } = dto;

    const userDetails = await this._userRepo.findById(userId);
    const newPlanDetails = await this._planRepository.findById(upgradingPlanId);

    const existingSubscription =
      await this._subscriptionRepo.getSubscriptionAndPlanDetailsBySubscriptionId(
        currentSubscriptionId
      );
    if (!newPlanDetails || !existingSubscription || !userDetails) {
      throw new ResourceNotFound('Some Details are not found');
    }

    let sessionUrl: string | null = null;
    if (existingSubscription.planDetails && existingSubscription.planDetails.monthlyPrice === 0) {
      console.log('going to create new session');
      sessionUrl = await this._paymentGateway.createSession({
        priceId: newPlanDetails.stripePriceId as string,
        customeerEmail: userDetails.email as string,
        planId: upgradingPlanId,
        userId: userId,
        trialPeriod: newPlanDetails.trialPeriod > 0 ? newPlanDetails.trialPeriod : 0,
      });

      return sessionUrl;
    } else {
      console.log('going to upgrade session');
      const subscriptionFromStripe = await this._paymentGateway.getSubscriptionBySubscriptionId(
        existingSubscription.stripeSubscriptionId as string
      );

      const itemId = subscriptionFromStripe?.items.data[0].id;

      //stripe subscription updated
      const upgradeResult = await this._paymentGateway.updateSession({
        stripeSubscriptioId: existingSubscription.stripeSubscriptionId as string,
        subscriptionItemId: itemId as string,
        newPriceId: newPlanDetails.stripePriceId as string,
      });

      return upgradeResult;
    }

    return null;
  }
}
