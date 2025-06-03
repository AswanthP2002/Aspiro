import Candidate from "../../../domain/entities/candidate/candidates";
import CandidateRepo from "../../../domain/interfaces/candidate/ICandidateRepo";

export class LoadCandidatesUseCase {
    constructor(private _candidateRepo : CandidateRepo) {}

    async execute(search? : string, page : number = 1, limit : number = 1) : Promise<any | null> { //change the return type to strict later
        const result = await this._candidateRepo.findCandidates(search, page, limit)
        return result
    }
}