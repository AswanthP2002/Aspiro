import ICandidateRepo from "../../../domain/interfaces/candidate/ICandidateRepo";
import deleteAssetsCloudinary from "../../../services/deleteAssetsCloudinary";
import IRemoveCoverphotoUseCase from "./interface/IRemoveCoverphotoUseCase";

export default class RemoveCoverphotoUseCase implements IRemoveCoverphotoUseCase {
    constructor(private _iCandidateRepo : ICandidateRepo){}

    async execute(candidateId: string, cloudinaryPublicId: string) : Promise<void> {
        await deleteAssetsCloudinary(cloudinaryPublicId)

        //update db
        await this._iCandidateRepo.removeCoverPhoto(candidateId)
    }
}