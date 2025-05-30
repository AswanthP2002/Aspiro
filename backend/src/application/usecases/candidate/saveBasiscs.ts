import CandidateRepo from "../../../domain/interfaces/candidate/ICandidateRepo";
import { CandidateDetails } from "../../../presentation/controllers/dtos/candidate/userDetailsDTO";

export default class SaveIntroDetailsUseCase {
    constructor(private candidateRepo : CandidateRepo){}

    async execute(candidate : CandidateDetails) : Promise<boolean>{
        const {id, role, city, district, state, country, pincode, summary} = candidate
        const savedBasisc = await this.candidateRepo.updateIntroDetails(id, role, city, district, state, country, pincode, summary)
        if(!savedBasisc) throw new Error("Candidate Not Updated")
        
        return true
    }
}