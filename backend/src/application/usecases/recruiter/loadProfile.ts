import Recruiter from "../../../domain/entities/recruiter/recruiter";
import IRecruiterRepo from "../../../domain/interfaces/recruiter/IRecruiterRepo";

export class LoadRecruiterProfileDataUseCase {
    constructor(private recruiterRepo : IRecruiterRepo){}

    async execute(id : string) : Promise<Recruiter> {
        const recruiterDetails = await this.recruiterRepo.aggregateRecruiterProfile(id)
        if(!recruiterDetails) throw new Error('Not Found')

        return recruiterDetails
    }
}