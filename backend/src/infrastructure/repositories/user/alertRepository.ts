import mongoose from 'mongoose';
import Alert from '../../../domain/entities/alerts/alerts';
import IAlertRepo from '../../../domain/interfaces/user/IAlertRepo';
import { AlertsDAO } from '../../database/DAOs/user/alerts.dao';
import BaseRepository from '../baseRepository';
import { injectable } from 'tsyringe';

@injectable()
export default class AlertRepository extends BaseRepository<Alert> implements IAlertRepo {
  constructor() {
    super(AlertsDAO);
  }

  async findByUserId(
    userId: string,
    statusFilter: string[],
    page: number,
    limit: number
  ): Promise<Alert[] | null> {
    if (!mongoose.isValidObjectId(userId)) return null;
    const skip = (page - 1) * limit;

    const result = await AlertsDAO.aggregate([
      {
        $match: {
          recipientId: new mongoose.Types.ObjectId(userId),
          status: { $in: statusFilter },
        },
      },
      {
        $facet: {
          alerts: [{ $sort: { createdAt: -1 } }, { $skip: skip }, { $limit: limit }],
        },
      },
    ]);
    const alerts = result[0]?.alerts;
    return alerts;
  }

  async getUnreadAlertsCountByUserId(userId: string): Promise<number | null> {
    const result = await AlertsDAO.find({
      recipientId: new mongoose.Types.ObjectId(userId),
      status: 'ACTIVE',
    }).countDocuments();

    return result;
  }
}
