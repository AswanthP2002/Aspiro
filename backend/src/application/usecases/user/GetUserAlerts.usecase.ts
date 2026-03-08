import { inject, injectable } from 'tsyringe';
import IGetUserAlertsUsecase from '../../interfaces/usecases/user/IGetUserAlerts.usecase';
import IAlertRepo from '../../../domain/interfaces/user/IAlertRepo';
import AlertDTO from '../../DTOs/user/alerts.dto';
import AlertMapper from '../../mappers/user/Alert.mapperClass';
import Alert from '../../../domain/entities/user/alerts';

@injectable()
export default class GetUserAlertsUsecase implements IGetUserAlertsUsecase {
  private _mapper: AlertMapper;
  constructor(@inject('IAlertsRepository') private _alertRepo: IAlertRepo) {
    this._mapper = new AlertMapper();
  }

  async execute(userId: string): Promise<AlertDTO[] | null> {
    const result = await this._alertRepo.findByUserId(userId);

    if (result) {
      const alertsDto: AlertDTO[] = [];
      result.forEach((alert: Alert) => alertsDto.push(this._mapper.AlertToAlertDto(alert)));

      return alertsDto;
    }

    return null;
  }
}
