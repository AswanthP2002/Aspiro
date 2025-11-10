import { RemoveCoverPhotoDTO } from '../../../DTOs/candidate -LEGACY/removeProfilePhoto.dto';
import UserDTO from '../../../DTOs/user/user.dto';

export default interface IRemoveUserCoverPhotoUsecase {
  execute(removeCoverphotoDto: RemoveCoverPhotoDTO): Promise<UserDTO | null>;
}
