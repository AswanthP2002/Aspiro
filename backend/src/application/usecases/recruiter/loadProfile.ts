import Recruiter from "../../../domain/entities/recruiter/recruiter";
import IRecruiterRepo from "../../../domain/interfaces/recruiter/IRecruiterRepo";

export class LoadProfileData {
    constructor(private recruiterRepo : IRecruiterRepo){}

    async execute(id : string) : Promise<Recruiter> {
        const recruiterDetails = await this.recruiterRepo.findById(id)
        if(!recruiterDetails) throw new Error('Not Found')

        return recruiterDetails
    }
}