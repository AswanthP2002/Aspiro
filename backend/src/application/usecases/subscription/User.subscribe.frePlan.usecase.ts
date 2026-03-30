import { inject, injectable } from 'tsyringe';
import { SubscribeFreePlanDTO } from '../../DTOs/subscription/subscribeFreePlan.dto';
import UserSubscriptionDTO from '../../DTOs/subscription/userSubscription.dto';
import IUserSubscribeFreePlanUsecase from '../../interfaces/usecases/subscription/IUser.subscribe.freePlan.usecase';
import ISubscriptionRepo from '../../../domain/interfaces/plan/ISubscriptionRepo';

@injectable()
export default class UserSubscribeFreePlanUsecase implements IUserSubscribeFreePlanUsecase {
  constructor(@inject('ISubscriptionRepository') private _repo: ISubscriptionRepo) {}

  async execute(dto: SubscribeFreePlanDTO): Promise<UserSubscriptionDTO | null> {
    console.log('-- reached inside the usecase --');
    const { planId, userId } = dto;
    console.log('-- going to call the usecase --');
    const result = await this._repo.create({ planId, userId, status: 'active' });
    console.log('-- called the usecase pringing the result --', result);
    return result ? (result as UserSubscriptionDTO) : null;
  }
}
