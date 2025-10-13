import CandidateDTO from '../../../DTOs/candidate/candidate.dto';
import { UploadCoverPhotoDTO } from '../../../DTOs/candidate/uploadCoverPhoto.dto';
import UserDTO from '../../../DTOs/shared/user.dto';

export default interface IUploadCoverPhotoUseCase {
  execute(uploadCoverPhotoDto: UploadCoverPhotoDTO): Promise<UserDTO | null>;
}
