
import CreateNotificationDTO, { NotificationDTO } from "../../../DTOs/notificationsDTO";

export default interface ICreateNotification {
    execute(createNotifications : CreateNotificationDTO) : Promise<NotificationDTO | null>
}