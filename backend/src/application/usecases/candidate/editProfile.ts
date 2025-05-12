import Candidate from "../../../domain/entities/candidate/candidates";
import CandidateRepo from "../../../domain/interfaces/candidate/ICandidateRepo";

export default class EditProfileUseCase {
    constructor(private iCandidateRepo : CandidateRepo){}

    async execute(id : string, name : string, role : string, city : string, district : string, state : string, country : string) : Promise<Candidate | null>{
        const updatedDoc = await this.iCandidateRepo.editProfile(id, name, role, city, district, state, country)
        if(!updatedDoc) throw new Error('Candidate not updated')
        return updatedDoc
    }
}