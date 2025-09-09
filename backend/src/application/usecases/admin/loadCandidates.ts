import Candidate from "../../../domain/entities/candidate/candidates";
import CandidateRepo from "../../../domain/interfaces/candidate/ICandidateRepo";
import LoadCandidateDTO from "../../DTOs/admin/loadCandidatesDTO";
import CandidateAggregatedDTO from "../../DTOs/candidate/candidateAggregatedDTO";
import CandidatePaginatedDTO from "../../DTOs/candidate/candidatePaginatedDTO";
import ILoadCandidateUseCase from "./interfaces/ILoadCandidateUseCase";

export class LoadCandidatesUseCase implements ILoadCandidateUseCase {
    constructor(private _candidateRepo : CandidateRepo) {}

    async execute(loadCandidateDto : LoadCandidateDTO) : Promise<CandidatePaginatedDTO | null> { //change the return type to strict later
        const {search, page, limit, sort, filter} = loadCandidateDto
        const result = await this._candidateRepo.findCandidates(search, page, limit, sort, filter)
        return result
    }
}