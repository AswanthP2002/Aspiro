import { inject, injectable } from 'tsyringe';
import IHandleWebhookUsecase from '../../interfaces/usecases/subscription/IHandleWebhookUsecase';
import ISubscriptionRepo from '../../../domain/interfaces/plan/ISubscriptionRepo';
import stripe from '../../../infrastructure/services/stripe.service';
import { IPlanRepository } from '../../../domain/interfaces/plan/IPlanRepository';

@injectable()
export default class HandleWebhookUsecase implements IHandleWebhookUsecase {
  constructor(
    @inject('ISubscriptionRepository') private _repo: ISubscriptionRepo,
    @inject('IPlanRepository') private _planRepo: IPlanRepository
  ) {}

  async execute(sig: string, rawBody: Buffer): Promise<{ received: boolean }> {
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        rawBody,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET as string
      );
    } catch (error) {
      console.log(error);
      throw new Error(`Webhook Error: ${error}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as any;
      const { userId, planId } = session.metadata;
      const planDetails = await this._planRepo.findById(planId);
      const subscriptionStartDate = new Date();
      const subscriptionEndDate = new Date(
        subscriptionStartDate.setDate(subscriptionStartDate.getDate() + 30)
      );
      await this._repo.create({
        planId: planId,
        userId: userId,
        status: 'active',
        currentPeriodStart: subscriptionStartDate,
        currentPeriodEnd: subscriptionEndDate,
        paymentStatus: 'paid',
        stripeCustomerId: session.customer,
        stripeSubscriptionId: session.subscription,
        features: planDetails?.featuresListed,
      });
    }

    return { received: true };
  }
}
