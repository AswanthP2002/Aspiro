import RemoveProfilePhotoDTO from '../../../DTOs/user/removeProfilePhoto.dto';
import UserDTO from '../../../DTOs/user/user.dto';

export default interface IRemoveUserProfilePictureUsecase {
  execute(removeProfilePhotoDto: RemoveProfilePhotoDTO): Promise<UserDTO | null>;
}
