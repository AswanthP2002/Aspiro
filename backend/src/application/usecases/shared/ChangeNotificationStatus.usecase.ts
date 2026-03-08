import { inject, injectable } from 'tsyringe';
import IChangeNotificationStatusUsecase from '../../interfaces/usecases/shared/IChangeNotificationStatus.usecase';
import NotificationMapper from '../../mappers/user/Notification.mapperClass';
import INotificationRepo from '../../../domain/interfaces/INotificationRepo';
import { UpdateNotificationDTO, NotificationDTO } from '../../DTOs/notifications.dto';

@injectable()
export default class ChangeNotificationStatusUsecase implements IChangeNotificationStatusUsecase {
  private _mapper: NotificationMapper;

  constructor(@inject('INotificationRepository') private _repo: INotificationRepo) {
    this._mapper = new NotificationMapper();
  }

  async execute(updateNotificaton: UpdateNotificationDTO): Promise<NotificationDTO | null> {
    const updatedNotification = await this._repo.update(updateNotificaton._id, { isRead: true });

    if (updatedNotification) {
      return this._mapper.notificationToNotificatonDTO(updatedNotification);
    }

    return null
  }

}
