import { inject, injectable } from 'tsyringe';
import IGetUnReadNotificationsCountUsecase from '../../interfaces/usecases/shared/IGetUnreadNotificationsCount.usecase';
import INotificationRepo from '../../../domain/interfaces/INotificationRepo';

@injectable()
export default class GetUnReadNotificationsCountUsecase implements IGetUnReadNotificationsCountUsecase {
  constructor(@inject('INotificationRepository') private _repo: INotificationRepo) {}
  async execute(userId: string): Promise<number | null> {
    const count = await this._repo.getUnReadNotificationsCount(userId);
    return count ? count : null;
  }
}
