import Notifications from '../entities/notifications.entity';
import IBaseRepo from './IBaseRepo';

export default interface INotificationRepo extends IBaseRepo<Notifications> {
  getNotifications(userId: string): Promise<Notifications[] | null>;
  updateReadStatus(id: string): Promise<Notifications | null>;
}
