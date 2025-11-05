import Notification from '../../domain/entities/notification.entity';
import { NotificationDTO } from '../DTOs/notifications.dto';

export default function mapToNotificationDTO(
  notification: Notification
): NotificationDTO {
  return {
    _id:notification._id,
    title:notification.title,
    description:notification.description,
    senderId:notification.senderId,
    receiverId:notification.receiverId,
    type:notification.type,
    isRead:notification.isRead,
    createdAt:notification.createdAt,
    link:notification.link,
    typeRelatedId:notification.typeRelatedId
  };
}
