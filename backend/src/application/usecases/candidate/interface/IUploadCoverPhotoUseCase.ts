import CandidateDTO from "../../../DTOs/candidate/candidateDTO";
import { UploadCoverPhotoDTO } from "../../../DTOs/candidate/uploadCoverPhotDTO";

export default interface IUploadCoverPhotoUseCase {
    execute(uploadCoverPhotoDto : UploadCoverPhotoDTO) : Promise<CandidateDTO | null>
}