import Notification from '../../domain/entities/notification.entity';
import CreateNotificationDTO from '../DTOs/notifications.dto';

export default function mapToNotificationsFromCreateNotification(
  createNotification: CreateNotificationDTO
): Notification {
  return {
    description: createNotification.description,
    senderId: createNotification.senderId,
    receiverId: createNotification.receiverId,
    title:createNotification.title,
    link:createNotification.link,
    type:createNotification.type,
    typeRelatedId:createNotification.typeRelatedId
  };
}
