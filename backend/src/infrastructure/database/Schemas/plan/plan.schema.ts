import { model, Schema } from 'mongoose';
import { Plan } from '../../../../domain/entities/plan/plan.entity';

export const PlanSchema = new Schema<Plan>({
  name: { type: String },
  description: { type: String },
  monthlyPrice: { type: Number },
  yearlyPrice: { type: Number },
  trialPeriod: { type: Number },
  badgeIcon: { type: String },
  isListed: { type: Boolean, default: true },
  currency: { type: String, enum: ['INR', 'USD'] },
  billingCycle: { type: String, enum: ['monthly', 'yearly'] },
  isActive: { type: Boolean, default: true },
  features: { type: [String] },
  featuresListed: { type: Schema.Types.Mixed, default: {} },
  isDeleted: { type: Boolean, default: false },
});

export const PlanDAO = model<Plan>('plans', PlanSchema);
