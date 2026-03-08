import Notification from '../../domain/entities/notification.entity';
import CreateNotificationDTO from '../DTOs/notifications.dto';

export default function mapToNotificationsFromCreateNotification(
  createNotification: CreateNotificationDTO
): Notification {
  return {
    recepientId: createNotification.recepientId,
    category: createNotification.category,
    actorId: createNotification.actorId,
    isRead: createNotification.isRead,
    message: createNotification.message,
    targetId: createNotification.targetId,
    targetType: createNotification.targetType,
    metadata: createNotification.metadata
  };
}
