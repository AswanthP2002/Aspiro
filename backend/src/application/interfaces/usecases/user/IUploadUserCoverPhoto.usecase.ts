import { UploadCoverPhotoDTO } from '../../../DTOs/user/uploadCoverPhoto.dto';
import UploadCoverPhotoResponseDTO from '../../../DTOs/user/uploadCoverPhotoResponse.dto';

export default interface IUploadUserCoverPhotoUsecase {
  execute(uploadCoverPhotoDto: UploadCoverPhotoDTO): Promise<UploadCoverPhotoResponseDTO | null>;
}
