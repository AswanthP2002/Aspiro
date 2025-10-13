import Notifications from '../../domain/entities/notifications.entity';
import CreateNotificationDTO from '../DTOs/notifications.dto';

export default function mapToNotificationsFromCreateNotification(
  createNotification: CreateNotificationDTO
): Notifications {
  return {
    senderId: createNotification.senderId,
    receiverId: createNotification.receiverId,
    description: createNotification.description,
    title: createNotification.title,
    link: createNotification.link,
    type: createNotification.type,
  };
}
