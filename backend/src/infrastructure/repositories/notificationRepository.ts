import INotificationRepo from '../../domain/interfaces/INotificationRepo';
import BaseRepository from './baseRepository';
import mongoose from 'mongoose';
import { NotificationDAO } from '../database/DAOs/notification.dao';
import Notification from '../../domain/entities/notification.entity';
import NotificationsQuery from '../../application/DTOs/shared/notifications.query';

export default class NotificationRepository
  extends BaseRepository<Notification>
  implements INotificationRepo
{
  constructor() {
    super(NotificationDAO);
  }

  async getNotificationsByUserId(
    query: NotificationsQuery
  ): Promise<{ notifications: Notification[]; hasMore: boolean } | null> {
    const { logedUserId, limit, page, offSet, status, type } = query;

    if (!mongoose.isValidObjectId(logedUserId)) return null;

    const skip = (page - 1) * limit;


    const filterQuery = {
      recepientId: new mongoose.Types.ObjectId(logedUserId),
      isRead: { $in: status },
      category: { $in: type },
    };

    const testResutl = await NotificationDAO.aggregate([
      { $match: filterQuery },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },
    ]);

    return { notifications: testResutl, hasMore: testResutl.length > 0 };
  }

  async softDeleteNotificationById(notificationId: string): Promise<void> {
    await NotificationDAO.updateOne(
      { _id: new mongoose.Types.ObjectId(notificationId) },
      { $set: { isDeleted: true } }
    );
  }

  async softDeleteNotificationByFollowerFollowingId(
    recipientId: string,
    actedId: string
  ): Promise<void> {
    await NotificationDAO.updateOne(
      {
        recepientId: new mongoose.Types.ObjectId(recipientId),
        actorId: new mongoose.Types.ObjectId(actedId),
      },
      {
        $set: { isDeleted: true },
      }
    );
  }

  async softDeleteNotificationByTypeAndUserIds(
    sender: string,
    reciver: string,
    type: string
  ): Promise<void> {
    await NotificationDAO.updateOne(
      {
        recepientId: new mongoose.Types.ObjectId(reciver),
        actorId: new mongoose.Types.ObjectId(sender),
        category: type,
      },
      { $set: { isDeleted: true } }
    );

  }

  async getUnReadNotificationsCount(userId: string): Promise<number | null> {
    if (!mongoose.isValidObjectId(userId)) return null;

    const count = await NotificationDAO.find({
      recepientId: new mongoose.Types.ObjectId(userId),
      isRead: false,
    }).countDocuments();

    return count;
  }

  async bulckMarkReadAllNotifications(): Promise<boolean> {
    const result = await NotificationDAO.updateMany({ isRead: false }, { $set: { isRead: true } });
    return result.modifiedCount > 0;
  }

  async deleteFollowNotification(follower: string, following: string): Promise<void> {
    await NotificationDAO.deleteOne({
      recepientId: new mongoose.Types.ObjectId(following),
      actorId: new mongoose.Types.ObjectId(follower),
      category: 'FOLLOW',
    });

  }

  async deleteConnectionRequestNotification(receipient: string, sender: string): Promise<void> {
     await NotificationDAO.deleteOne({
      recepientId: new mongoose.Types.ObjectId(receipient),
      actorId: new mongoose.Types.ObjectId(sender),
      category: 'CONNECTION_REQUEST',
    });

  }

  async getANotificationBySendReceiverCategory(
    receipient: string,
    sender: string,
    category: string
  ): Promise<Notification | null> {
    const result = await NotificationDAO.findOne({
      recepientId: new mongoose.Types.ObjectId(receipient),
      actorId: new mongoose.Types.ObjectId(sender),
      category: category,
    });
    return result;
  }
}
