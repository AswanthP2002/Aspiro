import NotificationsQuery from '../../application/DTOs/shared/notifications.query';
import Notification from '../entities/notification.entity';
import IBaseRepo from './IBaseRepo';

export default interface INotificationRepo extends IBaseRepo<Notification> {
  getNotificationsByUserId(
    query: NotificationsQuery
  ): Promise<{ notifications: Notification[]; hasMore: boolean } | null>;
  softDeleteNotificationByFollowerFollowingId(recipientId: string, actedId: string): Promise<void>;
  softDeleteNotificationById(notificationId: string): Promise<void>;
  softDeleteNotificationByTypeAndUserIds(
    sender: string,
    reciver: string,
    type: string
  ): Promise<void>;
  getUnReadNotificationsCount(userId: string): Promise<number | null>;
  bulckMarkReadAllNotifications(): Promise<boolean>;
  deleteFollowNotification(follower: string, following: string): Promise<void>;
  deleteConnectionRequestNotification(receipient: string, sender: string): Promise<void>;
  getANotificationBySendReceiverCategory(
    receipient: string,
    sender: string,
    category: string
  ): Promise<Notification | null>;
}
