import Notification from '../../domain/entities/notification.entity';
import { NotificationDTO } from '../DTOs/notifications.dto';

export default function mapToNotificationDTO(
  notification: Notification
): NotificationDTO {
  return {
   _id:notification._id,
    recepientId:notification.recepientId,
    type:notification.type,
    category:notification.category,
    actorId:notification.actorId,
    targetType:notification.targetType,
    targetId:notification.targetId,
    message:notification.message,
    isRead:notification.isRead,
    createdAt:notification.createdAt,
    metaData:notification.metaData
  };
}
