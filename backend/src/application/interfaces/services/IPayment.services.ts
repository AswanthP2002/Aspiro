import Stripe from 'stripe';

export default interface IPaymentServices {
  createSession(data: {
    priceId: string;
    trialPeriod: number;
    customeerEmail: string;
    userId: string;
    planId: string;
  }): Promise<string>;

  updateSession(data: {
    stripeSubscriptioId: string;
    subscriptionItemId: string;
    newPriceId: string;
  }): Promise<{ id: string; status: string }>;

  getSubscriptionBySubscriptionId(subscriptionId: string): Promise<Stripe.Subscription | null>;
}

export interface ISubscriptionService {
  createProduct(name: string, description: string): Promise<{ productId: string }>;
  createPrice(productId: string, amount: number): Promise<{ priceId: string }>;
  updateProductName(stripeProductId: string, newName: string): Promise<{ productId: string }>;
  updateProductDescription(
    stripeProductId: string,
    updatedDescription: string
  ): Promise<{ productId: string }>;
  updateProductStatusActive(productId: string): Promise<{ productId: string }>;
  updateProductStatusInactive(productId: string): Promise<{ productId: string }>;
}
