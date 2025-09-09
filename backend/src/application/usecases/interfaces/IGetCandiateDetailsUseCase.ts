import CandidateAggregatedDTO from "../../DTOs/candidate/candidateAggregatedDTO";

export default interface IGetCandidateDetailsUseCase {
    execute(candidateId : string) : Promise<CandidateAggregatedDTO | null>
}