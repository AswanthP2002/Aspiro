import IRecruiterRepo from "../../../domain/interfaces/recruiter/IRecruiterRepo";

export default class UnblockCompanyUseCase {
    constructor(private _recruiterRepo : IRecruiterRepo){}

    async execute(id : string) : Promise<boolean> {
        const result = await this._recruiterRepo.unblockRecruiter(id)
        return result
    }
}