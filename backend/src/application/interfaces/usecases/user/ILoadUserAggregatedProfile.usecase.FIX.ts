import { UserPublicProfileDTO } from '../../../DTOs/user/userProfileAggregated.dto.FIX';

export default interface ILoadUserPublicProfileUsecase {
  execute(userId: string): Promise<UserPublicProfileDTO | null>;
}
