import { UploadProfilePictureDTO } from '../../../DTOs/candidate/uploadProfilePicture.dto';
import UserDTO from '../../../DTOs/user/user.dto';

export default interface IUploadProfilePictureUseCase {
  execute(uploadProfilePictureDto: UploadProfilePictureDTO): Promise<UserDTO | null>;
}
