import CandidateDTO from '../../DTOs/candidate/candidate.dto';

export default interface IFindCandidateByCandidateIdUseCase {
  execute(candidateId: string): Promise<CandidateDTO | null>;
}
