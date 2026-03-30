import { injectable } from 'tsyringe';
import IGetUserInvoicesUsecase from '../../interfaces/usecases/subscription/IGetUserInvoices.usecase';
import InvoiceDTO from '../../DTOs/subscription/invoice.dto';
import stripe from '../../../infrastructure/services/stripe.service';
import Stripe from 'stripe';

@injectable()
export default class GetUserInvoicesUsecase implements IGetUserInvoicesUsecase {
  async execute(stripeCustomerId: string): Promise<InvoiceDTO[] | null> {
    const invoices = await stripe.invoices.list({
      customer: stripeCustomerId,
      limit: 10,
    });

    if (invoices) {
      return invoices.data.map((invoices: Stripe.Invoice) => ({
        id: invoices.number as string,
        amount: (invoices.amount_paid / 100) as number,
        status: invoices.status as string,
        date: new Date(invoices.created * 1000).toLocaleDateString(),
        downloadUrl: invoices.invoice_pdf as string,
        hostedUrl: invoices.hosted_invoice_url as string,
      }));
    }

    return null;
  }
}
