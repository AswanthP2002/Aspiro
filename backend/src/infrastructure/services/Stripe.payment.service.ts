import { injectable } from 'tsyringe';
import IPaymentServices, {
  ISubscriptionService,
} from '../../application/interfaces/services/IPayment.services';
import stripe from './stripe.service';
import Stripe from 'stripe';

@injectable()
export default class StripePaymentGateway implements IPaymentServices, ISubscriptionService {
  async createSession(data: {
    priceId: string;
    trialPeriod: number;
    customeerEmail: string;
    userId: string;
    planId: string;
  }): Promise<string> {
    console.log('checking planId before passing it', data.planId, typeof data.planId);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'upi'],
      line_items: [
        {
          price: data.priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      subscription_data: data.trialPeriod > 0 ? { trial_period_days: data.trialPeriod } : {},
      customer_email: data.customeerEmail,
      success_url: `http://localhost:5173/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:5173/payment-failed`,
      metadata: {
        userId: data.userId as string,
        planId: data.planId as string,
      },
    });

    return session.url as string;
  }

  async updateSession(data: {
    stripeSubscriptioId: string;
    subscriptionItemId: string;
    newPriceId: string;
  }): Promise<{ id: string; status: string }> {
    const result = await stripe.subscriptions.update(data.stripeSubscriptioId, {
      items: [
        {
          id: data.subscriptionItemId,
          price: data.newPriceId,
        },
      ],
    });

    // console.log('Update session result -> ', result);

    return {
      id: result.id,
      status: result.status,
    };
  }

  async getSubscriptionBySubscriptionId(
    subscriptionId: string
  ): Promise<Stripe.Subscription | null> {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    return subscription;
  }

  async createProduct(name: string, description: string): Promise<{ productId: string }> {
    const result = await stripe.products.create({
      name: name,
      description: description,
      active: true,
    });

    return { productId: result.id };
  }

  async createPrice(productId: string, amount: number): Promise<{ priceId: string }> {
    const result = await stripe.prices.create({
      product: productId,
      currency: 'inr',
      unit_amount: amount * 100,
      recurring: {
        interval: 'month',
      },
    });

    return { priceId: result.id };
  }

  async updateProductName(
    stripeProductId: string,
    newName: string
  ): Promise<{ productId: string }> {
    const result = await stripe.products.update(stripeProductId, {
      name: newName,
    });

    return { productId: result.id };
  }

  async updateProductDescription(
    stripeProductId: string,
    updatedDescription: string
  ): Promise<{ productId: string }> {
    const result = await stripe.products.update(stripeProductId, {
      description: updatedDescription,
    });

    return { productId: result.id };
  }

  async updateProductStatusActive(productId: string): Promise<{ productId: string }> {
    const result = await stripe.products.update(productId, {
      active: true,
    });

    return { productId: result.id };
  }

  async updateProductStatusInactive(productId: string): Promise<{ productId: string }> {
    const result = await stripe.products.update(productId, {
      active: false,
    });

    return { productId: result.id };
  }
}
