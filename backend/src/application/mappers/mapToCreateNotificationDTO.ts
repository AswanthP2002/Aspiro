import Notifications from "../../domain/entities/notifications";
import { NotificationDTO } from "../DTOs/notificationsDTO";

export default function mapToNotificationDTO(notification : Notifications) : NotificationDTO {
    return {
        _id:notification._id,
        senderId:notification.senderId,
        receiverId:notification.receiverId,
        title:notification.title,
        description:notification.description,
        isRead:notification.isRead,
        type:notification.type,
        typeRelatedId:notification.typeRelatedId,
        link:notification.link,
        createdAt:notification.createdAt
    }
}