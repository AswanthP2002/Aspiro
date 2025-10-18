import CandidateDTO from '../../../DTOs/candidate/candidate.dto';
import { UploadCoverPhotoDTO } from '../../../DTOs/candidate/uploadCoverPhoto.dto';
import UserDTO from '../../../DTOs/user/user.dto';

export default interface IUploadCoverPhotoUseCase {
  execute(uploadCoverPhotoDto: UploadCoverPhotoDTO): Promise<UserDTO | null>;
}
