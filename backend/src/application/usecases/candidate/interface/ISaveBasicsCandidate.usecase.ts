import CandidateDTO from '../../../DTOs/candidate/candidate.dto';
import UpdateCandidateDTO from '../../../DTOs/candidate/updateCandidate.dto';

export default interface ISaveBasicsCandidateUseCase {
  execute(updateCandidateDto: UpdateCandidateDTO): Promise<CandidateDTO | null>;
}
