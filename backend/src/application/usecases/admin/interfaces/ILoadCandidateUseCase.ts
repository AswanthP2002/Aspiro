import LoadCandidateDTO from "../../../DTOs/admin/loadCandidatesDTO";
import CandidateAggregatedDTO from "../../../DTOs/candidate/candidateAggregatedDTO";
import CandidatePaginatedDTO from "../../../DTOs/candidate/candidatePaginatedDTO";

export default interface ILoadCandidateUseCase {
    execute(loadCandidateDto : LoadCandidateDTO) : Promise<CandidatePaginatedDTO | null>
}