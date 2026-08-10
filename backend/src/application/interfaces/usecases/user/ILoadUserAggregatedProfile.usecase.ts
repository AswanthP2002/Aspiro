import { UserPublicProfileDTO } from '../../../DTOs/user/userProfileAggregated.dto';

export default interface ILoadUserPublicProfileUsecase {
  execute(userId: string): Promise<UserPublicProfileDTO | null>;
}
