import Recruiter from "../../../domain/entities/recruiter/recruiter";
import IRecruiterRepo from "../../../domain/interfaces/recruiter/IRecruiterRepo";

export class LoadCompaniesUseCase {
    constructor(private recruiterRepo : IRecruiterRepo){}

    async execute(search : string, page : number, limit : number, sort : string) : Promise<any>{ //change to strict later
        const result = await this.recruiterRepo.findRecruiters(search, page, limit, sort)
        return result
    }
}