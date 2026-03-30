import { NotificationDTO } from '../../../DTOs/notification/notifications.dto';
import GetNotificationsDTO from '../../../DTOs/notification/getNotifications.dto';

export default interface IGetUserSpecificNotificationUsecase {
  execute(dto: GetNotificationsDTO): Promise<{ notifications: NotificationDTO[] } | null>;
}
