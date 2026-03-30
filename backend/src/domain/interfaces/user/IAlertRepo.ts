import Alert from '../../entities/alerts/alerts';
import IBaseRepo from '../IBaseRepo';

export default interface IAlertRepo extends IBaseRepo<Alert> {
  findByUserId(
    userId: string,
    statusFilter: string[],
    page: number,
    limit: number
  ): Promise<Alert[] | null>;
  getUnreadAlertsCountByUserId(userId: string): Promise<number | null>;
}
