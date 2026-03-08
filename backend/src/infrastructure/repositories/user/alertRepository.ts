import mongoose from 'mongoose';
import Alert from '../../../domain/entities/user/alerts';
import IAlertRepo from '../../../domain/interfaces/user/IAlertRepo';
import { AlertsDAO } from '../../database/DAOs/user/alerts.dao';
import BaseRepository from '../baseRepository';

export default class AlertRepository extends BaseRepository<Alert> implements IAlertRepo {
  constructor() {
    super(AlertsDAO);
  }

  async findByUserId(userId: string): Promise<Alert[] | null> {
    if (!mongoose.isValidObjectId(userId)) return null;

    const result = await AlertsDAO.find({ recipientId: new mongoose.Types.ObjectId(userId) });
    return result;
  }
}
