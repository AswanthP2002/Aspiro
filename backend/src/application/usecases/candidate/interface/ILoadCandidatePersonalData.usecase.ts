import CandidateAggregatedDTO from '../../../DTOs/candidate/candidateAggregated.dto';
import CandidateDTO from '../../../DTOs/candidate/candidate.dto';

export default interface ILoadCandidatePersonalDataUseCase {
  execute(id: string): Promise<CandidateAggregatedDTO | null>;
}
