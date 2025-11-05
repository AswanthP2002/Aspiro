import { model } from 'mongoose';
import { NotificationSchema } from '../Schemas/notification.schema';
import Notification from '../../../domain/entities/notification.entity';

export const NotificationDAO = model<Notification>(
  'notification',
  NotificationSchema
);
