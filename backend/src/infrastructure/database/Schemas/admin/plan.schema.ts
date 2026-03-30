// import { model, Schema } from 'mongoose';
// import { Plan } from '../../../../domain/entities/plan/plan.entity';

// export const PlanSchema = new Schema<Plan>(
//   {
//     name: { type: String },
//     billingCycle: { type: String, default: 'monthly' },
//     currency: { type: String, enum: ['INR', 'USD'], default: 'INR' },
//     isActive: { type: Boolean, default: false, required: true },
//     description: { type: String },
//     price: { type: Number },
//     features: { type: [String] },
//   },
//   { timestamps: true }
// );

// export const PlanDAO = model<Plan>('plan', PlanSchema);
