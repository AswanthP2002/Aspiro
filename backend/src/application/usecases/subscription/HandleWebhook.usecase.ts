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
    console.log('Webhook usecase event');
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(
        rawBody,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET as string
      );
    } catch (error) {
      console.log('Error occured in weabhook handling', error);
      throw new Error(`Webhook Error: ${error}`);
    }

    if (event.type === 'checkout.session.completed') {
      console.log('session completed for subscription from stripe side');
      const session = event.data.object as Stripe.Checkout.Session;

      if (!session.metadata) {
        throw new Error('No metadata found');
      }
      const userId = session.metadata['userId'];
      const planId = session.metadata['planId'];
      const subscription = await stripe.subscriptions.retrieve(session.subscription as string);

      const planDetails = await this._planRepo.findById(planId);
      const subscriptionStartDate = subscription.items.data[0].current_period_start
        ? new Date(subscription.items.data[0].current_period_start * 1000)
        : new Date();
      const subscriptionEndDate = subscription.items.data[0].current_period_end
        ? new Date(subscription.items.data[0].current_period_end * 1000)
        : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
      const trialStart = subscription.trial_start
        ? new Date(subscription.trial_start * 1000)
        : null;

      const trialEnd = subscription.trial_end ? new Date(subscription.trial_end * 1000) : null;

      //check if this user already have a free subscription data. If data exist then update the existing subscription data
      const isUserHaveAnyExistingFreeSubscription =
        await this._repo.getUserSubscriptionDetails(userId);

      if (isUserHaveAnyExistingFreeSubscription) {
        console.log('user alreeady have a subscription, going to update it');
        //This User already have a free subscription. Update the details with new data
        const updateResult = await this._repo.update(
          isUserHaveAnyExistingFreeSubscription._id as string,
          {
            planId: planId,
            status: subscription.status,
            currentPeriodStart: subscriptionStartDate,
            currentPeriodEnd: subscriptionEndDate,
            paymentStatus: subscription.status === 'trialing' ? 'pending' : 'paid',
            stripeCustomerId: session.customer as string,
            stripeSubscriptionId: session.subscription as string,
            features: planDetails?.featuresListed,
            trialPeriodStarts: trialStart,
            trialPeriodEnds: trialEnd,
            planMetaData: {
              name: planDetails?.name as string,
              price: planDetails?.monthlyPrice ?? 0,
            },
            createdAt: new Date(),
            updatedAt: new Date(),
          }
        );

        console.log('Subscription updated result --> ', updateResult?._id);
      } else {
        //This user dont have any existing free subscription. Creating new one
        console.log('user dont have any subscription so creating new one');
        const result = await this._repo.create({
          planId: planId,
          userId: userId,
          status: subscription.status,
          currentPeriodStart: subscriptionStartDate,
          currentPeriodEnd: subscriptionEndDate,
          paymentStatus: subscription.status === 'trialing' ? 'pending' : 'paid',
          stripeCustomerId: session.customer as string,
          stripeSubscriptionId: session.subscription as string,
          features: planDetails?.featuresListed,
          trialPeriodStarts: trialStart,
          trialPeriodEnds: trialEnd,
          planMetaData: {
            name: planDetails?.name as string,
            price: planDetails?.monthlyPrice ?? 0,
          },
        });

        console.log('created new one id ', result?._id ?? null);
      }
    }

    if (event.type === 'customer.subscription.updated') {
      console.warn('Update happened');
      console.log('Subscription update event triggered');
      const subscription = event.data.object as Stripe.Subscription;
      const priceId = subscription.items.data[0].price.id;
      const planDetails = await this._planRepo.findPlanByStripePriceId(priceId);

      if (planDetails) {
        await this._repo.updateByStripeSubscriptionId(subscription.id, {
          status: subscription.status,
          planId: planDetails._id,
          features: planDetails.featuresListed,
          updatedAt: new Date(),
          planMetaData: {
            name: planDetails.name,
            price: planDetails.monthlyPrice,
          },
        });
      }
    }

    if (event.type === 'invoice.paid') {
      const invoice = event.data.object as Stripe.Invoice;

      const subscriptionId =
        typeof invoice?.parent?.subscription_details?.subscription === 'string'
          ? invoice.parent.subscription_details.subscription
          : invoice.parent?.subscription_details?.subscription?.id;

      await this._repo.updateByStripeSubscriptionId(subscriptionId as string, {
        paymentStatus: 'paid',
      });
    }

    if (event.type === 'customer.subscription.deleted') {
      const subscription = event.data.object as Stripe.Subscription;

      await this._repo.updateByStripeSubscriptionId(subscription.id, {
        isCanceled: true,
        status: 'cancelled',
      });
    }
    return { received: true };
  }
}
