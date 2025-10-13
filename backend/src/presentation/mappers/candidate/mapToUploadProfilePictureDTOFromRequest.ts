import { UploadProfilePictureDTO } from '../../../application/DTOs/candidate/uploadProfilePicture.dto';
import { uploadProfilePictureRequestDTO } from '../../DTOs/candidate/uploadProfilePictureRequestDTO';

export default function mapToUploadProfilePictureDTOFromRequest(
  requestDto: uploadProfilePictureRequestDTO
): UploadProfilePictureDTO {
  return {
    candidateId: requestDto.candidateId,
    imageFile: requestDto.imageFile,
    publicId: requestDto.publicId,
  };
}
