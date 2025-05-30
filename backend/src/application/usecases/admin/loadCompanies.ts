import Recruiter from "../../../domain/entities/recruiter/recruiter";
import IRecruiterRepo from "../../../domain/interfaces/recruiter/IRecruiterRepo";

export class LoadCompaniesUseCase {
    constructor(private recruiterRepo : IRecruiterRepo){}

    async execute() : Promise<Recruiter[]>{
        const recruiters = await this.recruiterRepo.findRecruiters()
        return recruiters
    }
}