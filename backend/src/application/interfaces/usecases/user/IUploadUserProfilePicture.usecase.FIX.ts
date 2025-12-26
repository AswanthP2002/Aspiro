import { UploadProfilePictureDTO } from '../../../DTOs/user/uploadProfilePicture.dto.FIX';
import { UserDto } from '../../../DTOs/user/user.dto.FIX';

export default interface IUploadUserProfilePictureUsecase {
  execute(uploadProfilePictureDto: UploadProfilePictureDTO): Promise<UserDto | null>;
}
