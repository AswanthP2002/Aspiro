import CandidateAggregatedDTO from "../../../DTOs/candidate/candidateAggregatedDTO";
import CandidateDTO from "../../../DTOs/candidate/candidateDTO";

export default interface ILoadCandidateDetailsUseCase {
    execute(id : string) : Promise<CandidateAggregatedDTO | null>
}