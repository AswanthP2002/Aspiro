import { inject, injectable } from 'tsyringe';
import { IGetUnreadAlertsCountUsecase } from '../../interfaces/usecases/alerts/IGetUnreadAlerts.usecase';
import IAlertRepo from '../../../domain/interfaces/user/IAlertRepo';

@injectable()
export class GetUnreadAlertsUsecase implements IGetUnreadAlertsCountUsecase {
  constructor(@inject('IAlertsRepository') private _repo: IAlertRepo) {}

  async execute(userId: string): Promise<number | null> {
    const count = await this._repo.getUnreadAlertsCountByUserId(userId);
    return count ?? null;
  }
}
