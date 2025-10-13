import INotificationRepo from '../../../../domain/interfaces/INotificationRepo';
import ICreateNotification from '../interface/ICreateNotification.usecase';
import mapToNotificationsFromCreateNotification from '../../../mappers/mapToNotificationsFromCreateNotification.mapper';
import CreateNotificationDTO, {
  NotificationDTO,
} from '../../../DTOs/notifications.dto';
import mapToNotificationDTO from '../../../mappers/mapToCreateNotificationDTO.mapper';

export default class CreateNotification implements ICreateNotification {
  constructor(private _iNotificationRepo: INotificationRepo) {}

  async execute(
    notification: CreateNotificationDTO
  ): Promise<NotificationDTO | null> {
    const newNotification =
      mapToNotificationsFromCreateNotification(notification);
    const result = await this._iNotificationRepo.create(newNotification);
    if (result) {
      const dto = mapToNotificationDTO(result);
      return dto;
    }
    return null;
  }
}
