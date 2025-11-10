import RemoveProfilePhotoDTO from '../../../DTOs/candidate -LEGACY/removeProfilePhoto.dto';
import UserDTO from '../../../DTOs/user/user.dto';

export default interface IRemoveUserProfilePictureUsecase {
  execute(removeProfilePhotoDto: RemoveProfilePhotoDTO): Promise<UserDTO | null>;
}
