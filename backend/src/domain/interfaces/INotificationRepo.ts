import Notification from '../entities/notification.entity';
import IBaseRepo from './IBaseRepo';

export default interface INotificationRepo extends IBaseRepo<Notification> {
  getNotificationsByUserId(userId: string): Promise<Notification[] | null>
}
