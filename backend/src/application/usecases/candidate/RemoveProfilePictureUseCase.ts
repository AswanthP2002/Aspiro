import ICandidateRepo from "../../../domain/interfaces/candidate/ICandidateRepo";
import deleteAssetsCloudinary from "../../../services/deleteAssetsCloudinary";
import IRemoveProfilePictureUseCase from "./interface/IRemoveProfilePictureUseCase";

export default class RemoveProfilePictureUseCase implements IRemoveProfilePictureUseCase {
    constructor(private _iCandidateRepo : ICandidateRepo) {}

    async execute(candidateId: string, cloudinaryPublicUrl: string): Promise<boolean | null> {
        //delete image from cloudinary
        await deleteAssetsCloudinary(cloudinaryPublicUrl)

        //update database
        const deleteResult = await this._iCandidateRepo.removeProfilePhoto(candidateId)
        return deleteResult
    }
}