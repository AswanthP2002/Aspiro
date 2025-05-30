import CandidateRepo from "../../../domain/interfaces/candidate/ICandidateRepo";

export class BlockCandidateUseCase {
    constructor(private _candidateRepo : CandidateRepo) {}

    async execute(id : string) : Promise<boolean> {
        const result = await this._candidateRepo.blockCandidate(id)
        return result
    }
}