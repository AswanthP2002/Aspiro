import Recruiter from "../../../domain/entities/recruiter/recruiter";
import IRecruiterRepo from "../../../domain/interfaces/recruiter/IRecruiterRepo";

export default class LoadCompanyDetailsUseCase {
    constructor(private _recruiterRepo : IRecruiterRepo){}

    async execute(companyId : string) : Promise<Recruiter | null> {
        const companyDetails = await this._recruiterRepo.findById(companyId)
        return companyDetails
    }
}