import { inject, injectable } from 'tsyringe';
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
      const customer = await stripe.customers.retrieve(customerStripeId as string, {
        expand: ['invoice_settings.default_payment_method'],
      });

      if (customer.deleted) {
        return null;
      }

      const defaultMethod = customer.invoice_settings.default_payment_method;
      if (
        !defaultMethod ||
        typeof defaultMethod === 'string' ||
        defaultMethod.object !== 'payment_method'
      )
        return null;

      return {
        brand: defaultMethod?.card?.brand as string,
        last4: defaultMethod?.card?.last4 as string,
        expMonth: defaultMethod?.card?.exp_month,
        expYear: defaultMethod?.card?.exp_year,
      };
    }

    return null;
  }
}
