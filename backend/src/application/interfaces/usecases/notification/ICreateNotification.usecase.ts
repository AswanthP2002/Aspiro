import CreateNotificationDTO, {
  NotificationDTO,
} from '../../../DTOs/notification/notifications.dto';

export default interface ICreateNotificationUsecase {
  execute(createNotifications: CreateNotificationDTO): Promise<NotificationDTO | null>;
}
