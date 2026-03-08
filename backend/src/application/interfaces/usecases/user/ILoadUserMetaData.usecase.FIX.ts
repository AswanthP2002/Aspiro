import UserMetaDataDTO from '../../../DTOs/user/userMetaData.dto.FIX';

export default interface ILoadUserMetaDataUsecase {
  execute(userId: string): Promise<UserMetaDataDTO | null>;
}
