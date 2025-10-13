import CandidateDTO from '../../../DTOs/candidate/candidate.dto';
import { UploadProfilePictureDTO } from '../../../DTOs/candidate/uploadProfilePicture.dto';
import UserDTO from '../../../DTOs/shared/user.dto';

export default interface IUploadProfilePictureUseCase {
  execute(
    uploadProfilePictureDto: UploadProfilePictureDTO
  ): Promise<UserDTO | null>;
}
