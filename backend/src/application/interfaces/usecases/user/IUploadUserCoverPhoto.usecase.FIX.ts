import { UploadCoverPhotoDTO } from '../../../DTOs/user/uploadCoverPhoto.dto.FIX';
import UploadCoverPhotoResponseDTO from '../../../DTOs/user/uploadCoverPhotoResponse.dto';

export default interface IUploadUserCoverPhotoUsecase {
  execute(uploadCoverPhotoDto: UploadCoverPhotoDTO): Promise<UploadCoverPhotoResponseDTO | null>;
}
