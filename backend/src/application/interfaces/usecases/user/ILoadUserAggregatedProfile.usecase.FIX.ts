import UserProfileAggregatedDTO from '../../../DTOs/user/userProfileAggregated.dto.FIX';

export default interface ILoadUserAggregatedProfileUsecase {
  execute(userId: string): Promise<UserProfileAggregatedDTO | null>;
}
