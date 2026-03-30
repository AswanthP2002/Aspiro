import { inject, injectable } from 'tsyringe';
import IGetSessionDetailsUsecase from '../../interfaces/usecases/subscription/IGetSessionDetails.usecase';
import stripe from '../../../infrastructure/services/stripe.service';
import ISubscriptionRepo from '../../../domain/interfaces/plan/ISubscriptionRepo';

@injectable()
export default class GetSessionDetailsUsecase implements IGetSessionDetailsUsecase {
  constructor(@inject('ISubscriptionRepository') private _repo: ISubscriptionRepo) {}
  async execute(sessionId: string): Promise<{
    amount: number;
    currency: string;
    email: string;
    planName: string;
    status: string;
    startingPeriod: string;
    endPeriod: string;
  }> {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items'],
    });

    return {
      amount: session && session.amount_total ? session.amount_total / 100 : 0,
      currency: session.currency as string,
      email: session.customer_email as string,
      planName: session.line_items?.data[0].description as string,
      status: session.payment_status as string,
      startingPeriod: new Date().toISOString(),
      endPeriod: new Date(session.expires_at).toISOString()
    };
  }
}
