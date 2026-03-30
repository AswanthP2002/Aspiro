export interface SubscriptionAnalyticsDTO {
  stats: {
    totalMRR: number;
    activeRecruiters: number;
    churnRate: number;
  };
  revenueGrowth: { month: string; amount: number }[];
  subscribers: SubscriberDetails[]
}

export interface SubscriberDetails {
  userName: string;
  userEmail: string;
  planName: string;
  billingCycle: string;
  nextRenewal: Date | string;
  amount: number;
  paymentStatus: string;
  status: string;
}
