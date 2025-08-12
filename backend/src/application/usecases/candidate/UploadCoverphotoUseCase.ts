import ICandidateRepo from "../../../domain/interfaces/candidate/ICandidateRepo";
import imgUploadToCloudinary from "../../../services/uploadToCloudinary";
import IUploadCoverPhotoUseCase from "./interface/IUploadCoverPhotoUseCase";

export default class UploadCoverphotoUseCase implements IUploadCoverPhotoUseCase {
    constructor(private _iCandidateRepo : ICandidateRepo){}

    async execute(candidateId: string, imgFile: any, publicId : string = ""): Promise<boolean | null> {
        const cloudinaryResult : any = await imgUploadToCloudinary(imgFile, 'candidate', publicId)
        const {secure_url, public_id} = cloudinaryResult

        const result = await this._iCandidateRepo.uploadCoverPhoto(candidateId, secure_url, public_id)
        return result

    }
}