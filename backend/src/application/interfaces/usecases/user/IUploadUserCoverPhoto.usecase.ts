import { UploadCoverPhotoDTO } from '../../../DTOs/candidate/uploadCoverPhoto.dto';
import UserDTO from '../../../DTOs/user/user.dto';

export default interface IUploadUserCoverPhotoUsecase {
  execute(uploadCoverPhotoDto: UploadCoverPhotoDTO): Promise<UserDTO | null>;
}
