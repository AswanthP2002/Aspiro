import ICandidateRepo from "../../../domain/interfaces/candidate/ICandidateRepo";
import imgUploadToCloudinary from "../../../services/uploadToCloudinary";
import CandidateDTO from "../../DTOs/candidate/candidateDTO";
import { UploadProfilePictureDTO } from "../../DTOs/candidate/uploadProfilePictureDTO";
import mapToCandidateDTO from "../../mappers/candidate/mapToCandidateDto";
import IUploadProfilePictureUseCase from "./interface/IUploadProfilePictureUseCase";

export default class UploadProfilePictureUseCase implements IUploadProfilePictureUseCase {
    constructor(private _ICandidateRepo : ICandidateRepo) {}

    async execute(uploadProfilepictureDto : UploadProfilePictureDTO): Promise<CandidateDTO | null> {
        const cloudinaryResult : any = await imgUploadToCloudinary(uploadProfilepictureDto.imageFile, 'candidate', uploadProfilepictureDto.publicId)
        const {secure_url, public_id} = cloudinaryResult
        const result = await this._ICandidateRepo.uploadProfilePhoto(uploadProfilepictureDto.candidateId, secure_url, public_id)
        
        if(result){
            const dto = mapToCandidateDTO(result)
            return dto
        }
        return null
    }
}