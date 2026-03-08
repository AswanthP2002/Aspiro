import Notification from '../../../domain/entities/notification.entity';
import { NotificationDTO } from '../../DTOs/notifications.dto';

export default class NotificationMapper {
  public notificationToNotificatonDTO(data: Notification): NotificationDTO {
    return {
      _id: data._id,
      category: data.category,
      actorId: data.actorId,
      isRead: data.isRead,
      message: data.message,
      metadata: data.metadata,
      recepientId: data.recepientId,
      targetId: data.targetId,
      targetType: data.targetType,
      targetUrl: data.targetUrl,
      createdAt: data.createdAt,
    };
  }
}
