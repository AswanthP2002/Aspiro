import { RemoveCoverPhotoDTO } from '../../../DTOs/user/removeProfilePhoto.dto.FIX';
import UserDTO from '../../../DTOs/user/user.dto.FIX';

export default interface IRemoveUserCoverPhotoUsecase {
  execute(removeCoverphotoDto: RemoveCoverPhotoDTO): Promise<UserDTO | null>;
}
