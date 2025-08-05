import CandidateRepo from "../../../domain/interfaces/candidate/ICandidateRepo";
import IBlockCandidateUseCase from "./interfaces/IBlockCandidateUseCase";

export class BlockCandidateUseCase implements IBlockCandidateUseCase {
    constructor(private _candidateRepo : CandidateRepo) {}

    async execute(id : string) : Promise<boolean> {
        const result = await this._candidateRepo.blockCandidate(id)
        return result
    }
}