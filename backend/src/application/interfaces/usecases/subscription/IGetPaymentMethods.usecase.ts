import PaymentMethodsStripeDTO from '../../../DTOs/subscription/GetPaymentMethods.dto';

export default interface IGetPaymentMethodsUsecase {
  execute(userId: string): Promise<PaymentMethodsStripeDTO | null>;
}
