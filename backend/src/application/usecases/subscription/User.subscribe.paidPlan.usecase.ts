import { inject, injectable } from 'tsyringe';
import { SubscribePaidPlanDTO } from '../../DTOs/subscription/subscribeFreePlan.dto';
import IUserSubscribePaidPlanUsecase from '../../interfaces/usecases/subscription/IUser.subscribe.paidePlan.usecase';
import { IPlanRepository } from '../../../domain/interfaces/plan/IPlanRepository';
import IUserRepository from '../../../domain/interfaces/IUserRepo';
import IPaymentServices from '../../interfaces/services/IPayment.services';

@injectable()
export default class UserSubscribePaidPlanUsecase implements IUserSubscribePaidPlanUsecase {
  constructor(
    @inject('IPlanRepository') private _planRepo: IPlanRepository,
    @inject('IUserRepository') private _userRepo: IUserRepository,
    @inject('StripePaymentGateway') private _paymentGateway: IPaymentServices
  ) {}

  async execute(dto: SubscribePaidPlanDTO): Promise<string> {
    const { planId, userId } = dto;
    const userDetails = await this._userRepo.findById(userId);
    const planDetails = await this._planRepo.findById(planId);

    if (!planDetails?.monthlyPrice) {
      throw new Error('No price provided ');
    }

    const sessionUrl = await this._paymentGateway.createSession({
      priceId: planDetails.stripePriceId as string,
      trialPeriod: planDetails?.trialPeriod || 0,
      customeerEmail: userDetails?.email as string,
      userId,
      planId,
    });

    console.log('Session created in stripe -- Session URL', sessionUrl);

    return sessionUrl;
  }
}
