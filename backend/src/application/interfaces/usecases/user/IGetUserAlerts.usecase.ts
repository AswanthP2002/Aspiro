import AlertDTO from '../../../DTOs/user/alerts.dto';

export default interface IGetUserAlertsUsecase {
  execute(userId: string): Promise<AlertDTO[] | null>;
}
