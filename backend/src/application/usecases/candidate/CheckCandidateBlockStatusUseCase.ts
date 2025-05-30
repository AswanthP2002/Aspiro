import CandidateRepo from "../../../domain/interfaces/candidate/ICandidateRepo";

export default class CheckCandidateBlockStatusUseCase {
    constructor(private _candidateRepo : CandidateRepo){}

    async execute(id : string) : Promise<boolean | undefined> {
        const isBlocked = await this._candidateRepo.isCandidateBlocked(id)
        return isBlocked
    }
}