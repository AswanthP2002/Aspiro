import { UploadCoverPhotoDTO } from "../../../application/DTOs/candidate/uploadCoverPhotDTO";
import { UploadCoverPhotoRequestDTO } from "../../DTOs/candidate/uploadCoverphotoRequestDTO";

export default function mapToUploadCoverPhotoDTOFromRequest(requestDto : UploadCoverPhotoRequestDTO) : UploadCoverPhotoDTO {
    return {
        candidateId:requestDto.candidateId,
        imageFile:requestDto.imageFile,
        publicId:requestDto.publicId
    }
}