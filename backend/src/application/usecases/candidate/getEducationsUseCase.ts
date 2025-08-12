import Education from "../../../domain/entities/candidate/educations";
import IEducationRepo from "../../../domain/interfaces/candidate/IEducationRepo";
import ILoadEducationsUseCase from "./interface/ILoadEducationsUseCase";

export default class GetEducationsUseCase implements ILoadEducationsUseCase {
    constructor(private _iEducationRepo : IEducationRepo){}

    async execute(candidateId : string) : Promise<Education[] | null> {
        const result = await this._iEducationRepo.findWithCandidateId(candidateId)
        return result
    }
}