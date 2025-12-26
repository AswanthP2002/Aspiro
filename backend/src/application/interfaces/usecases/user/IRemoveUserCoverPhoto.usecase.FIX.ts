import { RemoveCoverPhotoDTO } from '../../../DTOs/candidate -LEGACY/removeProfilePhoto.dto.FIX';
import { UserDto } from '../../../DTOs/user/user.dto.FIX';

export default interface IRemoveUserCoverPhotoUsecase {
  execute(removeCoverphotoDto: RemoveCoverPhotoDTO): Promise<UserDto | null>;
}
