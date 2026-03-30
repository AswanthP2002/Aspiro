import { inject, injectable } from 'tsyringe';
import IChangeNotificationStatusUsecase from '../../interfaces/usecases/notification/IChangeNotificationStatus.usecase';
import NotificationMapper from '../../mappers/notification/Notification.mapperClass';
import INotificationRepo from '../../../domain/interfaces/INotificationRepo';
import { UpdateNotificationDTO, NotificationDTO } from '../../DTOs/notification/notifications.dto';

@injectable()
export default class ChangeNotificationStatusUsecase implements IChangeNotificationStatusUsecase {
  constructor(
    @inject('INotificationRepository') private _repo: INotificationRepo,
    @inject('NotificationMapper') private _mapper: NotificationMapper
  ) {}

  async execute(updateNotificaton: UpdateNotificationDTO): Promise<NotificationDTO | null> {
    const updatedNotification = await this._repo.update(updateNotificaton._id, { isRead: true });

    if (updatedNotification) {
      return this._mapper.notificationToNotificatonDTO(updatedNotification);
    }

    return null;
  }
}
