import { inject, injectable } from 'tsyringe';
import IGetUserAlertsUsecase from '../../interfaces/usecases/alerts/IGetUserAlerts.usecase';
import IAlertRepo from '../../../domain/interfaces/user/IAlertRepo';
import AlertDTO, { GetAlertsRequestDTO } from '../../DTOs/alerts/alerts.dto';
import AlertMapper from '../../mappers/alert/Alert.mapperClass';
import Alert from '../../../domain/entities/alerts/alerts';

@injectable()
export default class GetUserAlertsUsecase implements IGetUserAlertsUsecase {
  constructor(
    @inject('IAlertsRepository') private _alertRepo: IAlertRepo,
    @inject('AlertsMapper') private _mapper: AlertMapper
  ) {}

  async execute(dto: GetAlertsRequestDTO): Promise<AlertDTO[] | null> {
    const { userId, page, limit, status } = dto;

    let statusFilter = ['ACTIVE', 'RESOLVED', 'DISMISSED'];
    switch (status) {
      case 'ACTIVE':
        statusFilter = ['ACTIVE'];
        break;
      case 'RESOLVED':
        statusFilter = ['RESOLVED'];
        break;
      case 'DISMISSED':
        statusFilter = ['DISMISSED'];
        break;
      default:
        statusFilter = ['ACTIVE', 'DISMISSED', 'RESOLVED'];
    }

    const result = await this._alertRepo.findByUserId(userId, statusFilter, page, limit);

    if (result) {
      const alertsDto: AlertDTO[] = [];
      result.forEach((alert: Alert) => alertsDto.push(this._mapper.AlertToAlertDto(alert)));

      return alertsDto;
    }

    return null;
  }
}
