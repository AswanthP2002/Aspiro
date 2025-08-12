import ICandidateRepo from "../../../domain/interfaces/candidate/ICandidateRepo";
import deleteAssetsCloudinary from "../../../services/deleteAssetsCloudinary";
import IRemoveCoverphotoUseCase from "./interface/IRemoveCoverphotoUseCase";

export default class RemoveCoverphotoUseCase implements IRemoveCoverphotoUseCase {
    constructor(private _iCandidateRepo : ICandidateRepo){}

    async execute(candidateId: string, cloudinaryPublicId: string): Promise<boolean | null> {
        await deleteAssetsCloudinary(cloudinaryPublicId)

        //update db
        const result = await this._iCandidateRepo.removeCoverPhoto(candidateId)
        return result
    }
}