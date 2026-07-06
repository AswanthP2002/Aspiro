export default interface UserSubscriptionDetailsDTO {
  _id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  joinedAt: string | Date;
  subscriptionMetaData: { action: string; date: string | Date }[];
  subscriptionDetails: {
    _id: string;
    planId: string;
    stripeCustomerId: string;
    stripeSubscriptionId: string;
    currentPeriodEnds: string | Date;
    features: { [key: string]: string | number | boolean };
  };
  planDetails: {
    _id: string;
    name: string;
    monthlyPrice: number;
  };
}
