import { inject, injectable } from 'tsyringe';
import ISubscriptionPortalUsecase from '../../interfaces/usecases/subscription/ISubscriptionPortal.usecase';
import ISubscriptionRepo from '../../../domain/interfaces/plan/ISubscriptionRepo';
import stripe from '../../../infrastructure/services/stripe.service';

@injectable()
export default class SubscriptionPortalUsecase implements ISubscriptionPortalUsecase {
  constructor(@inject('ISubscriptionRepository') private _subscriptionRepo: ISubscriptionRepo) {}

  async execute(userId: string): Promise<{ url: string } | null> {
    const subscription = await this._subscriptionRepo.findOneWithUserId(userId);

    if (subscription) {
      const stripeCustomerId = subscription.stripeCustomerId;
      const session = await stripe.billingPortal.sessions.create({
        customer: stripeCustomerId,
        return_url: `http://localhost:5173/profile/billings`,
      });

      return { url: session.url };
    }

    return null;
  }
}
