import CandidateAggregatedDTO from '../../DTOs/candidate -LEGACY/candidateAggregated.dto';

export default interface IGetCandidateDetailsUseCase {
  execute(candidateId: string): Promise<CandidateAggregatedDTO | null>;
}
