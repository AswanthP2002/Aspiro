import mapToNotificationsFromCreateNotification from '../../mappers/notification/mapToNotificationsFromCreateNotification.mapper';
import CreateNotificationDTO, { NotificationDTO } from '../../DTOs/notification/notifications.dto';
import mapToNotificationDTO from '../../mappers/notification/mapToCreateNotificationDTO.mapper';
import { inject, injectable } from 'tsyringe';
import ICreateNotificationUsecase from '../../interfaces/usecases/notification/ICreateNotification.usecase';
import INotificationRepo from '../../../domain/interfaces/INotificationRepo';

@injectable()
export default class CreateNotificationUsecase implements ICreateNotificationUsecase {
  constructor(@inject('INotificationRepository') private _notificationRepo: INotificationRepo) {}

  async execute(notification: CreateNotificationDTO): Promise<NotificationDTO | null> {
    const newNotification = mapToNotificationsFromCreateNotification(notification);

    const result = await this._notificationRepo.create(newNotification);
    if (result) {
      const dto = mapToNotificationDTO(result);
      return dto;
    }
    return null;
  }
}
