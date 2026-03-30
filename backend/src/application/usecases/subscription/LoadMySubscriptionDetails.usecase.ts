import { inject, injectable } from 'tsyringe';
import ILoadMySubscriptionDetailsUsecase from '../../interfaces/usecases/subscription/ILoadMySubscriptionDetails.usecase';
import ISubscriptionRepo from '../../../domain/interfaces/plan/ISubscriptionRepo';
import { UserSubscriptionAndPlanDetailsDTO } from '../../DTOs/subscription/userSubscription.dto';

@injectable()
export default class LoadMySubscriptionDetailsUsecase implements ILoadMySubscriptionDetailsUsecase {
  constructor(@inject('ISubscriptionRepository') private _repo: ISubscriptionRepo) {}

  async execute(userId: string): Promise<UserSubscriptionAndPlanDetailsDTO | null> {
    const result = await this._repo.getUserSubscriptionDetails(userId);
    if (result) {
      return result as UserSubscriptionAndPlanDetailsDTO;
    }

    return null;
  }
}
