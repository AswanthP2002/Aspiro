import { inject, injectable } from 'tsyringe';
import { SubscribePaidPlanDTO } from '../../DTOs/subscription/subscribeFreePlan.dto';
import ISubscriptionRepo from '../../../domain/interfaces/plan/ISubscriptionRepo';
import IUserSubscribePaidPlanUsecase from '../../interfaces/usecases/subscription/IUser.subscribe.paidePlan.usecase';
import { IPlanRepository } from '../../../domain/interfaces/plan/IPlanRepository';
import stripe from '../../../infrastructure/services/stripe.service';
import IUserRepository from '../../../domain/interfaces/IUserRepo';

@injectable()
export default class UserSubscribePaidPlanUsecase implements IUserSubscribePaidPlanUsecase {
  constructor(
    @inject('ISubscriptionRepository') private _repo: ISubscriptionRepo,
    @inject('IPlanRepository') private _planRepo: IPlanRepository,
    @inject('IUserRepository') private _userRepo: IUserRepository
  ) {}

  async execute(dto: SubscribePaidPlanDTO): Promise<string> {
    const { planId, userId } = dto;
    const userDetails = await this._userRepo.findById(userId);
    const planDetails = await this._planRepo.findById(planId);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'upi'],
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: planDetails?.name || 'Subscription plan',
              description: planDetails?.description || 'Access features',
            },
            unit_amount:
              planDetails && planDetails?.monthlyPrice ? planDetails?.monthlyPrice * 100 : 0,
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      customer_email: userDetails?.email as string,
      success_url: `http://localhost:5173/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:5173/feed`,
      metadata: {
        userId: userId,
        planId: planId,
      },
    });

    return session.url as string;
  }
}
