import AlertDTO, { GetAlertsRequestDTO } from '../../../DTOs/alerts/alerts.dto';

export default interface IGetUserAlertsUsecase {
  execute(dto: GetAlertsRequestDTO): Promise<AlertDTO[] | null>;
}
