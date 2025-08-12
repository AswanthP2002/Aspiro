import ICandidateRepo from "../../../domain/interfaces/candidate/ICandidateRepo";
import imgUploadToCloudinary from "../../../services/uploadToCloudinary";
import IUploadProfilePictureUseCase from "./interface/IUploadProfilePictureUseCase";

export default class UploadProfilePictureUseCase implements IUploadProfilePictureUseCase {
    constructor(private _ICandidateRepo : ICandidateRepo) {}

    async execute(candidateId: string, imgFile : any, publicId : string = ""): Promise<boolean | null> {
        const cloudinaryResult : any = await imgUploadToCloudinary(imgFile, 'candidate', publicId)
        const {secure_url, public_id} = cloudinaryResult
        const result = await this._ICandidateRepo.uploadProfilePhoto(candidateId, secure_url, public_id)
        return result
    }
}