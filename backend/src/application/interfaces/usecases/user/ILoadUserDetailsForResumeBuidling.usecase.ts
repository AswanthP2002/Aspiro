import UserFullProfileDataDTO from '../../../DTOs/user/user.fullProfileData.dto';

export default interface ILoadUserDetailsForResumeBuildingUsecase {
  execute(userId: string): Promise<UserFullProfileDataDTO | null>;
}
