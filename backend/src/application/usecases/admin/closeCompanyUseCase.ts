import IRecruiterRepo from "../../../domain/interfaces/recruiter/IRecruiterRepo";

export default class CloseCompanyUseCase {
    constructor(private _recruiterRepo : IRecruiterRepo){}

    async execute(id : string) : Promise<boolean> {
        const deleteResult = await this._recruiterRepo.deleteRecruiter(id)
        return deleteResult
    }
}