import { model } from 'mongoose';
import Notifications from '../../../domain/entities/notifications.entity';
import { NotificationSchema } from '../Schemas/notification.schema';

export const NotificationDAO = model<Notifications>(
  'notification',
  NotificationSchema
);
