import { inject, injectable } from 'tsyringe';
import IMarkReadAllNotificationsUsecase from '../../interfaces/usecases/user/IMarkReadAllNotifications.usecase';
import INotificationRepo from '../../../domain/interfaces/INotificationRepo';

@injectable()
export default class MarkReadAllNotifications implements IMarkReadAllNotificationsUsecase {
  constructor(@inject('INotificationRepository') private _repo: INotificationRepo) {}

  async execute(): Promise<boolean> {
    const result = await this._repo.bulckMarkReadAllNotifications()
    return result;
  }
}
