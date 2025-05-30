import IRecruiterRepo from "../../../domain/interfaces/recruiter/IRecruiterRepo";

export default class BlockCompanyUseCase {
    constructor(private _recruiterRepo : IRecruiterRepo){}

    async execute(id : string) : Promise<boolean> {
        const result = await this._recruiterRepo.blockRecruiter(id)
        return result
    }
}