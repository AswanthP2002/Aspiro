import Candidate from "../../../domain/entities/candidate/candidates";
import CandidateRepo from "../../../domain/interfaces/candidate/ICandidateRepo";

export class LoadCandidatePersonalDataUC {
    constructor(private cRepo : CandidateRepo){}

    async execute(id : string) : Promise<Candidate>{
        const candidateDetails = await this.cRepo.findById(id)

        if(!candidateDetails) throw new Error('Not Found')

        return candidateDetails
    }
}