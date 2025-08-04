import Education from "../../../domain/entities/candidate/educations";
import IEducationRepo from "../../../domain/interfaces/candidate/IEducationRepo";
import IEditEducationUseCase from "./interface/IEditEducationUseCase";

export default class EditEducationUseCase implements IEditEducationUseCase {
    constructor(private _iEducationRepo : IEducationRepo) {}

    async execute(educationId : string, education : Education) : Promise<boolean> {
        const result = await this._iEducationRepo.editEducation(educationId, education)
        return result
    }
}