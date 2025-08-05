import CandidateRepo from "../../../domain/interfaces/candidate/ICandidateRepo";
import IUnblockCandidateUseCase from "./interfaces/IUnblockCandidateUseCase";

export class UnblockCandidateUseCase implements IUnblockCandidateUseCase {
    constructor(private _candidateRepo : CandidateRepo) {}

    async execute(id : string) : Promise<boolean> {
        const result = await this._candidateRepo.unblockCandidate(id)
        return result
    }
}