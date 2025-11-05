import INotificationRepo from '../../../../domain/interfaces/INotificationRepo';
import ICreateNotification from '../../../interfaces/usecases/shared/ICreateNotification.usecase';
import mapToNotificationsFromCreateNotification from '../../../mappers/mapToNotificationsFromCreateNotification.mapper';
import CreateNotificationDTO, { NotificationDTO } from '../../../DTOs/notifications.dto';
import mapToNotificationDTO from '../../../mappers/mapToCreateNotificationDTO.mapper';
import { inject, injectable } from 'tsyringe';
import ICreateNotificationUsecase from '../../../interfaces/usecases/shared/ICreateNotification.usecase';

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
