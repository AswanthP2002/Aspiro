import Recruiter from "../../../domain/entities/recruiter/recruiter";
import IRecruiterRepo from "../../../domain/interfaces/recruiter/IRecruiterRepo";
import ILoadCompanyDetailsUseCase from "./interfaces/ILoadCompanyDetailsUseCase";

export default class LoadCompanyDetailsUseCase implements ILoadCompanyDetailsUseCase {
    constructor(private _recruiterRepo : IRecruiterRepo){}

    async execute(companyId : string) : Promise<Recruiter | null> {
        const companyDetails = await this._recruiterRepo.findById(companyId)
        return companyDetails
    }
}