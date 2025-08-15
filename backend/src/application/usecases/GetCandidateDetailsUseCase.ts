import ICandidateRepo from "../../domain/interfaces/candidate/ICandidateRepo";
import IGetCandidateDetailsUseCase from "./interfaces/IGetCandiateDetailsUseCase";

export default class GetCandidateDetailsUseCase implements IGetCandidateDetailsUseCase {
    constructor(private _iCandidateRepo : ICandidateRepo) {}

    async execute(candidateId: string): Promise<any[] | null> {
        const result = await this._iCandidateRepo.candidateAggregatedData(candidateId)
        return result
    }
}