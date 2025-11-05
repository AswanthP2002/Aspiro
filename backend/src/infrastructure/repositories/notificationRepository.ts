import { Db } from 'mongodb';
import INotificationRepo from '../../domain/interfaces/INotificationRepo';
import BaseRepository from './baseRepository';
import mongoose from 'mongoose';
import { NotificationDAO } from '../database/DAOs/notification.dao';
import Notification from '../../domain/entities/notification.entity';

export default class NotificationRepository
  extends BaseRepository<Notification>
  implements INotificationRepo
{
  constructor() {
    super(NotificationDAO);
  }

  async getNotifications(receiverId: string): Promise<Notification[] | null> {
    const notifications = await NotificationDAO.find({
      receiverId: new mongoose.Types.ObjectId(receiverId),
    })
      .sort({ createdAt: -1 })
      .lean();
    return notifications;
  }

  async updateReadStatus(id: string): Promise<Notification | null> {
    const updatedResult = await NotificationDAO.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      { $set: { isRead: true } }
    );

    return updatedResult;
  }
}
