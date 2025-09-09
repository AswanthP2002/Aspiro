import CandidateDTO from "../../../DTOs/candidate/candidateDTO";
import { UploadProfilePictureDTO } from "../../../DTOs/candidate/uploadProfilePictureDTO";

export default interface IUploadProfilePictureUseCase {
    execute(uploadProfilePictureDto : UploadProfilePictureDTO) : Promise<CandidateDTO | null>
}