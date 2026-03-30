export interface Plan {
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

// {
//   "planName": "Basic",
//   "planDescription": "Basic Plan",
//   "monthlyPrice": 0,
//   "yearlyPrice": 0,
//   "trialPeriod": 0,
//   "badgeIcon": "Lightning",
//   "isListed": true,
//   "connectionRequests": 10,
//   "jobApplications": 5,
//   "features": [
//     "resumeBuilder",
//     "socialFeed",
//     "jobRecommendation"
//   ],
//   "directMessaging": false,
//   "interviewPractice": false,
//   "pushJob": false,
//   "recruiterProfile": false,
//   "resumeAnalyzer": false,
//   "smartFilter": false
// }
