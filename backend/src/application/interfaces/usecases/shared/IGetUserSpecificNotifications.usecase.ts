import { NotificationDTO } from '../../../DTOs/notifications.dto';
import GetNotificationsDTO from '../../../DTOs/user/getNotifications.dto';

export default interface IGetUserSpecificNotificationUsecase {
  execute(
    dto: GetNotificationsDTO
  ): Promise<{ notifications: NotificationDTO[]; unRead: number; hasMore: boolean } | null>;
}
