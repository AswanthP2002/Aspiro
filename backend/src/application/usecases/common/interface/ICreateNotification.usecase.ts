import CreateNotificationDTO, {
  NotificationDTO,
} from '../../../DTOs/notifications.dto';

export default interface ICreateNotification {
  execute(
    createNotifications: CreateNotificationDTO
  ): Promise<NotificationDTO | null>;
}
