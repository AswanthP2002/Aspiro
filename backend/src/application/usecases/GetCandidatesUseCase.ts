import Candidate from "../../domain/entities/candidate/candidates";
import ICandidateRepo from "../../domain/interfaces/candidate/ICandidateRepo";
import IGetCandidatesUseCase from "./interfaces/IGetCandidatesUseCase";

export default class GetCandidatesUseCase implements IGetCandidatesUseCase {
    constructor(private _iCandidateRepo : ICandidateRepo) {}

    async execute(search: string, page: number, limit: number, sort: string, filter: any): Promise<Candidate[] | null> {
        const result = await this._iCandidateRepo.findCandidates(search, page, limit, sort, filter)
        return result
    }
}