import Candidate from "../../../domain/entities/candidate/candidates";
import CandidateRepo from "../../../domain/interfaces/candidate/ICandidateRepo";

export class LoadCandidateDetailsUseCase {
    constructor(private _candidateRepo : CandidateRepo){}

    async execute(id : string) : Promise<Candidate | null> {
        const candidate = await this._candidateRepo.candidateAggregatedData(id)
        console.log('Candidate details loading useCase', candidate)
        return candidate
    }
}