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

  async getNotificationsByUserId(userId: string): Promise<Notification[] | null> {
    if(!mongoose.isValidObjectId(userId)) return null
    
    const result = await NotificationDAO.find({
      recepientId:new mongoose.Types.ObjectId(userId)
    })
    console.log('Notifications before sending', result)
    return result
  }
}
