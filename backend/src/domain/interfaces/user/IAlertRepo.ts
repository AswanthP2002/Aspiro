import Alert from '../../entities/user/alerts';
import IBaseRepo from '../IBaseRepo';

export default interface IAlertRepo extends IBaseRepo<Alert> {
  findByUserId(userId: string): Promise<Alert[] | null>;
}
