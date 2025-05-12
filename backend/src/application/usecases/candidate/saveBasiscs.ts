import CandidateRepo from "../../../domain/interfaces/candidate/ICandidateRepo";

export default class SaveBasics {
    constructor(private candidateRepo : CandidateRepo){}

    async execute(id : string, role : string, city : string, district : string, state : string, country : string, pincode : string, summary : string) : Promise<boolean>{
        const savedBasisc = await this.candidateRepo.updateIntroDetails(id, role, city, district, state, country, pincode, summary)
        if(!savedBasisc) throw new Error("Candidate Not Updated")
        
        return true
    }
}