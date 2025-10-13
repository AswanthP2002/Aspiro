import CandidateDTO from '../../../DTOs/candidate/candidate.dto';

export default interface IFindCandidateByUserIdUseCase {
  execute(userId?: string): Promise<CandidateDTO | null>;
}
