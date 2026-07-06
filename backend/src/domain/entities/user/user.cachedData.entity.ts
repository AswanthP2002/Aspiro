export default interface UserCachedData {
  _id?: string;
  name?: string;
  headline?: string;
  email?: string;
  role?: string;
  profilePicture?: string;
  isTrialUsed?: boolean;
  subscription: {
    subscriptionId: string;
    planId: string;
    name: string;
    price: number;
    features?: { [key: string]: string | number | boolean };
  };
}
