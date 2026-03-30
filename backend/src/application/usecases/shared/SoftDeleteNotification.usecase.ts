import { inject, injectable } from 'tsyringe';
import ISoftDeleteNotificationUsecase from '../../interfaces/usecases/notification/ISoftDeleteNotification.usecase';
import INotificationRepo from '../../../domain/interfaces/INotificationRepo';
import { UpdateNotificationDTO } from '../../DTOs/notification/notifications.dto';

@injectable()
export default class SoftDeleteNotificationUsecase implements ISoftDeleteNotificationUsecase {
  constructor(@inject('INotificationRepository') private _repo: INotificationRepo) {}

  async execute(updateNotificationDto: UpdateNotificationDTO): Promise<void> {
    await this._repo.softDeleteNotificationById(updateNotificationDto._id as string);
  }
}
