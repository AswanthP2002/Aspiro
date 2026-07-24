export default interface PaymentMethodsStripeDTO {
  brand: string;
  last4: string;
  expMonth?: number;
  expYear?: string | number;
}
