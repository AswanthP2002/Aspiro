import Notification from '../entities/notification.entity';
import IBaseRepo from './IBaseRepo';

export default interface INotificationRepo extends IBaseRepo<Notification> {
  getNotifications(userId: string): Promise<Notification[] | null>;
  updateReadStatus(id: string): Promise<Notification | null>;
}
