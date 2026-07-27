import mongoose, { model, Schema } from 'mongoose';
import UserSubscription from '../../../../domain/entities/plan/userSubscription.entity';

export const UserSubscriptionSchema = new Schema<UserSubscription>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    planId: { type: mongoose.Schema.Types.ObjectId, required: true }, // Links to your Plan data
    stripeSubscriptionId: { type: String, required: false }, // sub_123...
    stripeCustomerId: { type: String, required: false }, // cus_123...
    status: {
      type: String,
      enum: ['active', 'trialing', 'cancellation-pending', 'cancelled', 'ended'],
      default: 'active',
    },
    currentPeriodStart: { type: Date },
    currentPeriodEnd: { type: Date },
    isCanceled: { type: Boolean, default: false },
    isCancelAtPeriodEnds: { type: Boolean, default: false },
    paymentStatus: { type: String, enum: ['paid', 'pending', 'failed'] }, // 'paid', 'pending', 'failed'
    features: { type: Schema.Types.Mixed, default: {} },
    billingCycle: { type: String, enum: ['monthly', 'annually'] },
    isTrialPeriodGiven: { type: Boolean, default: false },
    planMetaData: {
      name: { type: String },
      price: { type: Number },
    },
    trialPeriodStarts: { type: Date },
    trialPeriodEnds: { type: Date },
  },
  { timestamps: true }
);

export const UserSubscriptionDAO = model<UserSubscription>('subscription', UserSubscriptionSchema);
