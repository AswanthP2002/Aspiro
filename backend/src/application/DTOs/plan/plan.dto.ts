export interface PlanDTO {
  _id?: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  trialPeriod: number;
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

export interface CreatePlanDTO {
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  trialPeriod: number;
  badgeIcon: string;
  isListed: boolean;
  currency: 'INR' | 'USD';
  billingCycle: 'monthly' | 'yearly';
  features: string[];
  featuresListed: { [key: string]: string | number };
  isActive: boolean;
}

export interface EditPlanDTO {
  _id?: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  trialPeriod: number;
  badgeIcon: string;
  isListed: boolean;
  currency: 'INR' | 'USD';
  billingCycle: 'monthly' | 'yearly';
  features: string[];
  featuresListed: { [key: string]: string | number };
  isActive: boolean;
}

export interface AdminGetPlanRequestDTO {
  page: number;
  limit: number;
}

export interface AdminTogglePlanListingRequestDTO {
  planId: string;
  status: 'LIST' | 'UNLIST';
}
