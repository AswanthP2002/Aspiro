import ProfilePictureUPloadResponseDTO from '../../../DTOs/user/profileUploadResponse.dto';
import { UploadProfilePictureDTO } from '../../../DTOs/user/uploadProfilePicture.dto.FIX';

export default interface IUploadUserProfilePictureUsecase {
  execute(
    uploadProfilePictureDto: UploadProfilePictureDTO
  ): Promise<ProfilePictureUPloadResponseDTO | null>;
}
