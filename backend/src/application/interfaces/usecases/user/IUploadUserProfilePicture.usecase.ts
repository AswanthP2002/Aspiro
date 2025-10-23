import { UploadProfilePictureDTO } from '../../../DTOs/candidate/uploadProfilePicture.dto';
import UserDTO from '../../../DTOs/user/user.dto';

export default interface IUploadUserProfilePictureUsecase {
  execute(uploadProfilePictureDto: UploadProfilePictureDTO): Promise<UserDTO | null>;
}
