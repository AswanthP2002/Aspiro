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
      enum: ['active', 'canceled', 'incomplete', 'past_due'],
      default: 'active',
    },
    currentPeriodStart: { type: Date },
    currentPeriodEnd: { type: Date },
    isCanceled: { type: Boolean, default: false },
    paymentStatus: { type: String, enum: ['paid', 'pending', 'failed'] }, // 'paid', 'pending', 'failed'
  },
  { timestamps: true }
);

export const UserSubscriptionDAO = model<UserSubscription>('subscription', UserSubscriptionSchema);
