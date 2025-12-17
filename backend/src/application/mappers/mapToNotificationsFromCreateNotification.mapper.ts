import Notification from '../../domain/entities/notification.entity';
import CreateNotificationDTO from '../DTOs/notifications.dto';

export default function mapToNotificationsFromCreateNotification(
  createNotification: CreateNotificationDTO
): Notification {
  return {
    type:createNotification.type,
    category:createNotification.category,
    actorId:createNotification.actorId,
    targetType:createNotification.targetType,
    targetId:createNotification.targetId,
    message:createNotification.message,
    isRead:createNotification.isRead,
    metaData:createNotification.metaData,
    recepientId:createNotification.recepientId
  };
}
