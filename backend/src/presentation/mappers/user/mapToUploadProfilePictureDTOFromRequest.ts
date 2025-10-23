import { UploadProfilePictureDTO } from '../../../application/DTOs/candidate/uploadProfilePicture.dto';
import { uploadProfilePictureRequestDTO } from '../../DTOs/user/uploadProfilePictureRequestDTO';

export default function mapToUploadProfilePictureDTOFromRequest(
  requestDto: uploadProfilePictureRequestDTO
): UploadProfilePictureDTO {
  return {
    userId: requestDto.userId,
    imageFile: requestDto.imageFile,
    publicId: requestDto.publicId,
  };
}
