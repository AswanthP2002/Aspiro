import CreateNotificationDTO, { NotificationDTO } from '../../../DTOs/notifications.dto';

export default interface ICreateNotificationUsecase {
  execute(createNotifications: CreateNotificationDTO): Promise<NotificationDTO | null>;
}
