import { NotificationDTO, UpdateNotificationDTO } from '../../../DTOs/notifications.dto';

export default interface IChangeNotificationStatusUsecase {
  execute(updateNotificaton: UpdateNotificationDTO): Promise<NotificationDTO | null>;
}
