import CandidateAggregatedDTO from '../../../DTOs/candidate/candidateAggregated.dto';

export default interface ILoadCandidateDetailsUseCase {
  execute(id: string): Promise<CandidateAggregatedDTO | null>;
}
