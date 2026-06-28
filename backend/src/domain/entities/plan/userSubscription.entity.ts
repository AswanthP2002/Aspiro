import { Plan } from './plan.entity';

export default interface UserSubscription {
  _id?: string;
  userId?: string;
  planId?: string;
  stripeSubscriptionId?: string;
  stripeCustomerId?: string;
  status: 'active' | 'canceled' | 'incomplete' | 'past_due';
  currentPeriodStart?: string | Date;
  isTrialPeriodGiven?: boolean;
  trialPeriodStarts?: Date | string;
  trialPeriodEnds?: Date | string;
  currentPeriodEnd?: string | Date;
  isCanceled?: boolean;
  billingCycle?: 'monthly' | 'annually';
  paymentStatus?: 'paid' | 'pending' | 'failed';
  features?: { [key: string]: string | number | boolean };
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface UserSubscriptionAndPlanDetails {
  _id?: string;
  userId?: string;
  planId?: string;
  stripeSubscriptionId?: string;
  stripeCustomerId?: string;
  status: 'active' | 'canceled' | 'incomplete' | 'past_due';
  currentPeriodStart?: string | Date;
  currentPeriodEnd?: string | Date;
  isCanceled?: boolean;
  isTrialPeriodGiven?: boolean;
  trialPeriodStarts?: string | Date;
  trialPeriodEnds?: string | Date;
  billingCycle?: 'monthly' | 'annually';
  paymentStatus?: 'paid' | 'pending' | 'failed';
  createdAt?: string | Date;
  updatedAt?: string | Date;
  features?: { [key: string]: string | number | boolean };
  planDetails: Plan;
}
