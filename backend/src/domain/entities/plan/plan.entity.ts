export interface Plan {
  _id?: string;
  stripeProductId?: string;
  name: string;
  description: string;
  monthlyPrice: number;
  stripePriceId?: string;
  trialPeriod: number;
  isTrialPiriodGiven?: boolean;
  badgeIcon: string;
  isListed: boolean;
  currency: 'INR' | 'USD';
  billingCycle: 'monthly' | 'yearly';
  features: string[];
  featuresListed: { [key: string]: string | number };
  isActive: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  isDeleted?: boolean;
}

export interface PlanWithActiveUsersCount extends Plan {
  activeUsers?: number;
}
