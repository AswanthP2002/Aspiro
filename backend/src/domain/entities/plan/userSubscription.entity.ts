import { Plan } from './plan.entity';

export default interface UserSubscription {
  _id?: string;
  userId?: string;
  planId?: string;
  stripeSubscriptionId?: string;
  stripeCustomerId?: string;
  status: 'active' | 'canceled' | 'incomplete' | 'past_due';
  currentPeriodStart?: string | Date;
  currentPeriodEnd?: string | Date;
  isCanceled?: boolean;
  paymentStatus?: 'paid' | 'pending' | 'failed';
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
  paymentStatus?: 'paid' | 'pending' | 'failed';
  createdAt?: string | Date;
  updatedAt?: string | Date;
  planDetails: Plan;
}
