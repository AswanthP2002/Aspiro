import { injectable, inject } from 'tsyringe';
import IMonthlyResetSubscriptionLImits from '../../interfaces/usecases/subscription/IMonthlyResetSubscriptionLimits';
import { IPlanRepository } from '../../../domain/interfaces/plan/IPlanRepository';
import ISubscriptionRepo from '../../../domain/interfaces/plan/ISubscriptionRepo';

@injectable()
export default class MonthlyResetSubscriptionLimitUsecase implements IMonthlyResetSubscriptionLImits {
  constructor(
    @inject('IPlanRepository') private _planRepo: IPlanRepository,
    @inject('ISubscriptionRepository') private _subscriptionRepo: ISubscriptionRepo
  ) {}

  async execute(): Promise<void> {
    //get all plans first
    const plans = await this._planRepo.find();
    if (plans) {
      //for each plan find their related subscriptions then reset limit based on their plan limit
      plans.forEach(async (plan) => {
        const subscriptions = await this._subscriptionRepo.findSubscriptionsByPlanId(
          plan._id as string
        );
        subscriptions?.forEach(async (subscription) => {
          await this._subscriptionRepo.update(subscription._id as string, {
            features: plan.featuresListed,
          });
          console.log(`subscription ${subscription._id} - updated`);
        });
      });
    }
  }
}
