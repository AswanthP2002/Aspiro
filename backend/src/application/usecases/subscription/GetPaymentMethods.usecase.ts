import { inject, injectable } from 'tsyringe';
import ISubscriptionPortalUsecase from '../../interfaces/usecases/subscription/ISubscriptionPortal.usecase';
import ISubscriptionRepo from '../../../domain/interfaces/plan/ISubscriptionRepo';
import stripe from '../../../infrastructure/services/stripe.service';
import IGetPaymentMethodsUsecase from '../../interfaces/usecases/subscription/IGetPaymentMethods.usecase';
import PaymentMethodsStripeDTO from '../../DTOs/subscription/GetPaymentMethods.dto';

@injectable()
export default class GetPaymentMethodsUsecase implements IGetPaymentMethodsUsecase {
  constructor(@inject('ISubscriptionRepository') private _subscriptionRepo: ISubscriptionRepo) {}

  async execute(userId: string): Promise<PaymentMethodsStripeDTO | null> {
    const subscription = await this._subscriptionRepo.findOneWithUserId(userId);
    if (subscription) {
      const customerStripeId = subscription.stripeCustomerId;
      const customer = (await stripe.customers.retrieve(customerStripeId as string, {
        expand: ['invoice_settings.default_payment_method'],
      })) as any;

      const defaultMethod = customer.invoice_settings.default_payment_method;
      if (!defaultMethod) return null;

      return {
        brand: defaultMethod.card.brand,
        last4: defaultMethod.card.last4,
        expMonth: defaultMethod.card.exp_month,
        expYear: defaultMethod.card.exp_year,
      };
    }

    return null;
  }
}
