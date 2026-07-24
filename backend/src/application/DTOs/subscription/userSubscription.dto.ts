import { PlanDTO } from '../plan/plan.dto';

export default interface UserSubscriptionDTO {
  _id?: string;
  userId?: string;
  planId?: string;
  stripeSubscriptionId?: string;
  stripeCustomerId?: string;
  status: string;
  currentPeriodStart: string | Date;
  currentPeriodEnd: string | Date;
  isCanceled: boolean;
  isCancelAtPeriodEnds?: boolean;
  paymentStatus: 'paid' | 'pending' | 'failed';
  features?: { [key: string]: string | number | boolean };
  createdAt?: string | Date;
  updatedAt?: string | Date;
  planMetadata?: {
    name: string;
    price: number;
  };
}

export interface UserSubscriptionAndPlanDetailsDTO {
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
  paymentStatus?: 'paid' | 'pending' | 'failed';
  createdAt?: string | Date;
  updatedAt?: string | Date;
  features?: { [key: string]: string | number | boolean };
  planMetadata?: {
    name: string;
    price: number;
  }
  planDetails: PlanDTO;
}
