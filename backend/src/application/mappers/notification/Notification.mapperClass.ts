import Notification from '../../../domain/entities/notification/notification.entity';
import NotificationWithActorDetails from '../../../domain/entities/notification/notificatioWithActorDetails.entity';
import { NotificationDTO } from '../../DTOs/notification/notifications.dto';

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

  public notificationWithActorDetailsToNotificationDTO(
    data: NotificationWithActorDetails
  ): NotificationDTO {
    return {
      _id: data._id,
      category: data.category,
      actorId: data.actorId,
      isRead: data.isRead,
      message: data.message,
      recepientId: data.recepientId,
      targetId: data.targetId,
      targetType: data.targetType,
      targetUrl: data.targetUrl,
      isDeleted: data.isDeleted,
      createdAt: data.createdAt,
      metadata: data.metadata,
      actorDetails: {
        _id: data.actorDetails?._id,
        name: data.actorDetails?.name,
        headline: data.actorDetails?.headline,
        profilePicture: data.actorDetails?.profilePicture?.cloudinarySecureUrl,
      },
    };
  }
}
