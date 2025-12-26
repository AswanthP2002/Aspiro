import { UploadCoverPhotoDTO } from '../../../application/DTOs/candidate -LEGACY/uploadCoverPhoto.dto.FIX';
import { UploadCoverPhotoRequestDTO } from '../../DTOs/user/uploadCoverphotoRequestDTO';

export default function mapToUploadCoverPhotoDTOFromRequest(
  requestDto: UploadCoverPhotoRequestDTO
): UploadCoverPhotoDTO {
  return {
    userId: requestDto.userId,
    imageFile: requestDto.imageFile,
    publicId: requestDto.publicId,
  };
}
