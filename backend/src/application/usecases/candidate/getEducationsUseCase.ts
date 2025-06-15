import Education from "../../../domain/entities/candidate/educations";
import IEducationRepo from "../../../domain/interfaces/candidate/IEducationRepo";

export default class GetEducationsUseCase {
    constructor(private _iEducationRepo : IEducationRepo){}

    async execute(candidateId : string) : Promise<Education[]> {
        const result = await this._iEducationRepo.getEducations(candidateId)
        return result
    }
}