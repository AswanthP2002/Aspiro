import Notification from '../../../domain/entities/notification/notification.entity';
import { NotificationDTO } from '../../DTOs/notification/notifications.dto';

export default function mapToNotificationDTO(notification: Notification): NotificationDTO {
  return {
    _id: notification._id,
    isRead: notification.isRead,
    category: notification.category,
    actorId: notification.actorId,
    message: notification.message,
    recepientId: notification.recepientId,
    targetId: notification.targetId,
    targetType: notification.targetType,
    createdAt: notification.createdAt,
    metadata: notification.metadata,
    targetUrl: notification.targetUrl,
  };
}
