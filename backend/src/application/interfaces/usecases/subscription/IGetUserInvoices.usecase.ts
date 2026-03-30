import InvoiceDTO from '../../../DTOs/subscription/invoice.dto';

export default interface IGetUserInvoicesUsecase {
  execute(stripeCustomerId: string): Promise<InvoiceDTO[] | null>;
}
