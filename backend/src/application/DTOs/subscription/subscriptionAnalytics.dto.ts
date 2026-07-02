export interface SubscriptionAnalyticsDTO {
  stats: {
    totalMRR: number;
    activeRecruiters: number;
    churnRate: number;
    subscriptionCategoryData: { label: string; value: number; color: string }[];
    recruiterTypeData: { label: string; value: number; color: string }[];
    userTypeData: { label: string; value: number; color: string }[];
  };
  revenueGrowth: { month: string; amount: number }[];
  subscribers: SubscriberDetailsDTO[];
}

export interface SubscriberDetailsDTO {
  userId: string;
  userName: string;
  userEmail: string;
  planName: string;
  billingCycle: string;
  nextRenewal: Date | string;
  amount: number;
  paymentStatus: string;
  status: string;
}
