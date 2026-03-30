import { inject, injectable } from 'tsyringe';
import { IDeleteNotificationsUsecase } from '../../interfaces/usecases/notification/IDeleteAllNotifications.usecase';
import INotificationRepo from '../../../domain/interfaces/INotificationRepo';

@injectable()
export default class DeleteNotificationsUsecase implements IDeleteNotificationsUsecase {
  constructor(@inject('INotificationRepository') private _repo: INotificationRepo) {}

  async execute(action: 'BULCK' | 'SINGLE', notificationId?: string): Promise<void> {
    if (action === 'SINGLE') {
      await this._repo.delete(notificationId as string);
    } else {
      await this._repo.deleteAll();
    }
  }
}
