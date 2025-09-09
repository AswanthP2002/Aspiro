import ICandidateRepo from "../../../domain/interfaces/candidate/ICandidateRepo";
import deleteAssetsCloudinary from "../../../services/deleteAssetsCloudinary";
import IRemoveProfilePictureUseCase from "./interface/IRemoveProfilePictureUseCase";

export default class RemoveProfilePictureUseCase implements IRemoveProfilePictureUseCase {
    constructor(private _iCandidateRepo : ICandidateRepo) {}

    async execute(candidateId: string, cloudinaryPublicUrl: string): Promise<void> {
        //delete image from cloudinary
        await deleteAssetsCloudinary(cloudinaryPublicUrl)

        //update database
        await this._iCandidateRepo.removeProfilePhoto(candidateId)
    }
}