import CandidateDTO from '../../DTOs/candidate -LEGACY/candidate.dto';

export default interface IFindCandidateByCandidateIdUseCase {
  execute(candidateId: string): Promise<CandidateDTO | null>;
}
