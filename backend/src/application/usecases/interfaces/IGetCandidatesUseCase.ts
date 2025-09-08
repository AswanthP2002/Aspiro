import Candidate from "../../../domain/entities/candidate/candidates";
import { FindCandidatesDTO } from "../../DTOs/candidate/candidateDTO";
import CandidatePaginatedDTO from "../../DTOs/candidate/candidatePaginatedDTO";

export default interface IGetCandidatesUseCase {
    execute(getCandidatesDto : FindCandidatesDTO) : Promise<CandidatePaginatedDTO | null>
}

//search : string, page : number, limit : number, sort : string, filter : any