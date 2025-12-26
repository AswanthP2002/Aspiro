import RemoveProfilePhotoDTO from '../../../DTOs/candidate -LEGACY/removeProfilePhoto.dto.FIX';
import { UserDto } from '../../../DTOs/user/user.dto.FIX';

export default interface IRemoveUserProfilePictureUsecase {
  execute(removeProfilePhotoDto: RemoveProfilePhotoDTO): Promise<UserDto | null>;
}
