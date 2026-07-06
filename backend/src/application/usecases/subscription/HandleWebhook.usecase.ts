import { inject, injectable } from 'tsyringe';
import IHandleWebhookUsecase from '../../interfaces/usecases/subscription/IHandleWebhookUsecase';
import ISubscriptionRepo from '../../../domain/interfaces/plan/ISubscriptionRepo';
import stripe from '../../../infrastructure/services/stripe.service';
import { IPlanRepository } from '../../../domain/interfaces/plan/IPlanRepository';
import Stripe from 'stripe';

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
      const subscription: any = await stripe.subscriptions.retrieve(session.subscription as string);

      const planDetails = await this._planRepo.findById(planId);
      const subscriptionStartDate = subscription.current_period_start
        ? new Date(subscription.current_period_start * 1000)
        : new Date();
      const subscriptionEndDate = subscription.current_period_end
        ? new Date(subscription.current_period_end * 1000)
        : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
      const trialStart = subscription.trial_start
        ? new Date(subscription.trial_start * 1000)
        : null;

      const trialEnd = subscription.trial_end ? new Date(subscription.trial_end * 1000) : null;
      await this._repo.create({
        planId: planId,
        userId: userId,
        status: subscription.status,
        currentPeriodStart: subscriptionStartDate,
        currentPeriodEnd: subscriptionEndDate,
        paymentStatus: subscription.status === 'trialing' ? 'pending' : 'paid',
        stripeCustomerId: session.customer,
        stripeSubscriptionId: session.subscription,
        features: planDetails?.featuresListed,
        trialPeriodStarts: trialStart,
        trialPeriodEnds: trialEnd,
      });
    }

    if (event.type === 'customer.subscription.updated') {
      const subscription = event.data.object as Stripe.Subscription;

      await this._repo.updateByStripeSubscriptionId(subscription.id, {
        status: subscription.status,
      });
    }

    if (event.type === 'invoice.paid') {
      const invoice = event.data.object as any;

      const subscriptionId =
        typeof invoice?.subscription === 'string' ? invoice.subscription : invoice.subscription?.id;

      await this._repo.updateByStripeSubscriptionId(subscriptionId, { paymentStatus: 'paid' });
    }
    return { received: true };
  }
}
