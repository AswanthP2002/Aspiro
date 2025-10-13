import { Schema } from 'mongoose';
import Notifications from '../../../domain/entities/notifications.entity';

export const NotificationSchema = new Schema<Notifications>(
  {
    senderId: { type: Schema.Types.ObjectId },
    receiverId: { type: Schema.Types.ObjectId },
    description: { type: String },
    isRead: { type: Boolean, default: false },
    link: { type: String },
    title: { type: String },
    type: { type: String },
    typeRelatedId: { type: Schema.Types.ObjectId },
  },
  { timestamps: true }
);
