import RemoveProfilePhotoDTO from '../../../DTOs/user/removeProfilePhoto.dto.FIX';
import UserDTO from '../../../DTOs/user/user.dto.FIX';

export default interface IRemoveUserProfilePictureUsecase {
  execute(removeProfilePhotoDto: RemoveProfilePhotoDTO): Promise<UserDTO | null>;
}
