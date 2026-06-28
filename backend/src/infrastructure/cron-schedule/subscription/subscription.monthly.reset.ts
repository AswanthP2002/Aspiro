import { injectable, inject } from 'tsyringe';
import IMonthlyResetSubscriptionLImits from '../../../application/interfaces/usecases/subscription/IMonthlyResetSubscriptionLimits';
import cron from 'node-cron';

@injectable()
export default class CronSubscriptionReset {
  constructor(
    @inject('IMonthlySubscriptionLimitReset')
    private _limitResetUsecase: IMonthlyResetSubscriptionLImits
  ) {}

  resetSubscriptionLimit() {
    console.log('-- task schedule for every 5 minutes --');
    cron.schedule('0 0 0 1 * *', () => {
      console.log('-- reseting limit for every 5 minutes --');
      this._limitResetUsecase.execute();
    });
  }
}
