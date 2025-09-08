import Candidate from "../../domain/entities/candidate/candidates";
import ICandidateRepo from "../../domain/interfaces/candidate/ICandidateRepo";
import { FindCandidatesDTO } from "../DTOs/candidate/candidateDTO";
import CandidatePaginatedDTO from "../DTOs/candidate/candidatePaginatedDTO";
import mapToCandidatePaginatedDTO from "../mappers/candidate/mapToCandidatePaginatedDTOFromCandidatePaginated";
import IGetCandidatesUseCase from "./interfaces/IGetCandidatesUseCase";

export default class GetCandidatesUseCase implements IGetCandidatesUseCase {
    constructor(private _iCandidateRepo : ICandidateRepo) {}

    async execute(getCandidatesDto : FindCandidatesDTO): Promise<CandidatePaginatedDTO | null> {
        const {search, page, limit, sort, filter} = getCandidatesDto
        const result = await this._iCandidateRepo.findCandidates(search, page, limit, sort, filter)
        if(result){
            const dto = mapToCandidatePaginatedDTO(result)
            return dto
        }

        return null
    }
}