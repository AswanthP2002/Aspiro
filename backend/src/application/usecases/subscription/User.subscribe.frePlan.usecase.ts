import { inject, injectable } from 'tsyringe';
import { SubscribeFreePlanDTO } from '../../DTOs/subscription/subscribeFreePlan.dto';
import UserSubscriptionDTO from '../../DTOs/subscription/userSubscription.dto';
import IUserSubscribeFreePlanUsecase from '../../interfaces/usecases/subscription/IUser.subscribe.freePlan.usecase';
import ISubscriptionRepo from '../../../domain/interfaces/plan/ISubscriptionRepo';

@injectable()
export default class UserSubscribeFreePlanUsecase implements IUserSubscribeFreePlanUsecase {
  constructor(@inject('ISubscriptionRepository') private _repo: ISubscriptionRepo) {}

  async execute(dto: SubscribeFreePlanDTO): Promise<UserSubscriptionDTO | null> {
    const { planId, userId } = dto;
    const result = await this._repo.create({ planId, userId, status: 'active' });
    return result ? (result as UserSubscriptionDTO) : null;
  }
}
