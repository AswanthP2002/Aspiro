import CandidateRepo from "../../../domain/interfaces/candidate/ICandidateRepo";

export class UnblockCandidateUseCase {
    constructor(private _candidateRepo : CandidateRepo) {}

    async execute(id : string) : Promise<boolean> {
        const result = await this._candidateRepo.unblockCandidate(id)
        return result
    }
}