import { UploadCoverPhotoDTO } from '../../../DTOs/candidate -LEGACY/uploadCoverPhoto.dto.FIX';
import { UserDto } from '../../../DTOs/user/user.dto.FIX';

export default interface IUploadUserCoverPhotoUsecase {
  execute(uploadCoverPhotoDto: UploadCoverPhotoDTO): Promise<UserDto | null>;
}
