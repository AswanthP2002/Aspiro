import ICandidateRepo from "../../../domain/interfaces/candidate/ICandidateRepo";
import imgUploadToCloudinary from "../../../services/uploadToCloudinary";
import CandidateDTO from "../../DTOs/candidate/candidateDTO";
import { UploadCoverPhotoDTO } from "../../DTOs/candidate/uploadCoverPhotDTO";
import mapToCandidateDTO from "../../mappers/candidate/mapToCandidateDto";
import IUploadCoverPhotoUseCase from "./interface/IUploadCoverPhotoUseCase";

export default class UploadCoverphotoUseCase implements IUploadCoverPhotoUseCase {
    constructor(private _iCandidateRepo : ICandidateRepo){}

    async execute(uploadCoverPhotoDto : UploadCoverPhotoDTO): Promise<CandidateDTO | null> {
        const cloudinaryResult : any = await imgUploadToCloudinary(uploadCoverPhotoDto.imageFile, 'candidate', uploadCoverPhotoDto.publicId)
        const {secure_url, public_id} = cloudinaryResult
        const result = await this._iCandidateRepo.uploadCoverPhoto(uploadCoverPhotoDto.candidateId, secure_url, public_id)
        if(result){
            const dto = mapToCandidateDTO(result)
            return dto
        }
        return null
    }
}