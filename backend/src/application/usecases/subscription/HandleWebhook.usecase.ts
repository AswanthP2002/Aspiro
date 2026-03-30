import { inject, injectable } from 'tsyringe';
import IHandleWebhookUsecase from '../../interfaces/usecases/subscription/IHandleWebhookUsecase';
import ISubscriptionRepo from '../../../domain/interfaces/plan/ISubscriptionRepo';
import stripe from '../../../infrastructure/services/stripe.service';

@injectable()
export default class HandleWebhookUsecase implements IHandleWebhookUsecase {
  constructor(@inject('ISubscriptionRepository') private _repo: ISubscriptionRepo) {}

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
      await this._repo.create({
        planId: planId,
        userId: userId,
        status: 'active',
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(session.expires_at * 1000),
        paymentStatus: 'paid',
        stripeCustomerId: session.customer,
        stripeSubscriptionId: session.subscription,
      });
    }

    return { received: true };
  }
}
