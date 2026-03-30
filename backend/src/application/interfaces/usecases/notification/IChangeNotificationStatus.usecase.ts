import {
  NotificationDTO,
  UpdateNotificationDTO,
} from '../../../DTOs/notification/notifications.dto';

export default interface IChangeNotificationStatusUsecase {
  execute(updateNotificaton: UpdateNotificationDTO): Promise<NotificationDTO | null>;
}
