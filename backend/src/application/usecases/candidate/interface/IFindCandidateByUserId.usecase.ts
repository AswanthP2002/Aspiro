import CandidateDTO from '../../../DTOs/candidate -LEGACY/candidate.dto';

export default interface IFindCandidateByUserIdUseCase {
  execute(userId?: string): Promise<CandidateDTO | null>;
}
