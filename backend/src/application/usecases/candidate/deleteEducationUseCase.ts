import IEducationRepo from "../../../domain/interfaces/candidate/IEducationRepo";

export default class DeleteEducationUseCase {
    constructor(private _iEducationRepo : IEducationRepo) {}

    async execute(educationId : string) : Promise<boolean> {
        const result = await this._iEducationRepo.deleteEducation(educationId)
        return result
    }
}