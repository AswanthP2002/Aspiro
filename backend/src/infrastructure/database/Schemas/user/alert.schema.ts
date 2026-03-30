import { Schema } from 'mongoose';
import Alert from '../../../../domain/entities/alerts/alerts';

export const AlertSchema = new Schema<Alert>(
  {
    recipientId: { type: Schema.Types.ObjectId },
    priority: { type: String, enum: ['LOW', 'MEDIUM', 'HIGH'] },
    status: { type: String, enum: ['ACTIVE', 'RESOLVED', 'DISMISSED'], default: 'ACTIVE' },
    type: {
      type: String,
      enum: ['JOB_APPLICATION', 'APPLICATION_UPDATE', 'SYSTEM_SECURITY', 'EXPIRY'],
    },
    title: { type: String },
    body: { type: String },
    actionUrl: { type: String, required: false },
    expiresAt: { type: Date },
  },
  { timestamps: true }
);
