import { Schema } from 'mongoose';
import Notification from '../../../domain/entities/notification.entity';

export const NotificationSchema = new Schema<Notification>(
  {
    recepientId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    category: {
      type: String,
      enum: [
        'LIKE',
        'COMMENT',
        'FOLLOW',
        'CONNECTION_REQUEST',
        'CONNECTION_ACCEPTED',
        'COMMENT_REPLY',
        'SHARE',
      ],
    },
    actorId: { type: Schema.Types.ObjectId },
    targetType: { type: String, enum: ['USER', 'POST', 'COMMENT'] },
    targetId: { type: Schema.Types.ObjectId },
    targetUrl: { type: String, required: false },
    message: { type: String },
    isRead: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    metadata: {
      type: Schema.Types.Mixed,
      required: false,
    },
  },
  { timestamps: true }
);