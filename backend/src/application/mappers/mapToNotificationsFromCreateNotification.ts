import Notifications from "../../domain/entities/notifications";
import CreateNotificationDTO from "../DTOs/notificationsDTO";


export default function mapToNotificationsFromCreateNotification(createNotification : CreateNotificationDTO) : Notifications {
    return {
        senderId:createNotification.senderId,
        receiverId:createNotification.receiverId,
        description:createNotification.description,
        title:createNotification.title,
        link:createNotification.link,
        type:createNotification.type
    }
}