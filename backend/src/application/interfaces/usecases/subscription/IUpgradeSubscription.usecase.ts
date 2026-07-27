import UpgradeSubscriptionDTO from '../../../DTOs/subscription/UpgradeSubscription.DTO';

export default interface IUpgradeSubscriptionUsecase {
  execute(dto: UpgradeSubscriptionDTO): Promise<{ id: string; status: string } | string | null>;
}
