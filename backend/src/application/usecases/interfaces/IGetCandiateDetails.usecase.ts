import CandidateAggregatedDTO from '../../DTOs/candidate/candidateAggregated.dto';

export default interface IGetCandidateDetailsUseCase {
  execute(candidateId: string): Promise<CandidateAggregatedDTO | null>;
}
