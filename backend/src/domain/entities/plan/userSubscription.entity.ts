import User from '../user/User.FIX';
import { Plan } from './plan.entity';

export default interface UserSubscription {
  _id?: string;
  userId?: string;
  planId?: string;
  stripeSubscriptionId?: string;
  stripeCustomerId?: string;
  status: string;
  currentPeriodStart?: string | Date;
  isTrialPeriodGiven?: boolean;
  trialPeriodStarts?: Date | string | null;
  trialPeriodEnds?: Date | string | null;
  currentPeriodEnd?: string | Date;
  isCanceled?: boolean;
  isCancelAtPeriodEnds?: boolean;
  billingCycle?: 'monthly' | 'annually';
  paymentStatus?: 'paid' | 'pending' | 'failed';
  features?: { [key: string]: string | number | boolean };
  planMetaData?: {
    name: string;
    price: number;
  };
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface UserSubscriptionAndPlanDetails {
  _id?: string;
  userId?: string;
  planId?: string;
  stripeSubscriptionId?: string;
  stripeCustomerId?: string;
  status: string;
  currentPeriodStart?: string | Date;
  currentPeriodEnd?: string | Date;
  isCanceled?: boolean;
  isCancelAtPeriodEnds?: boolean;
  isTrialPeriodGiven?: boolean;
  trialPeriodStarts?: string | Date;
  trialPeriodEnds?: string | Date;
  billingCycle?: 'monthly' | 'annually';
  paymentStatus?: 'paid' | 'pending' | 'failed';
  createdAt?: string | Date;
  updatedAt?: string | Date;
  features?: { [key: string]: string | number | boolean };
  planDetails: Plan;
  userDetails?: User;
}
