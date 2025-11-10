import CandidateDTO from '../../../DTOs/candidate -LEGACY/candidate.dto';
import UpdateCandidateDTO from '../../../DTOs/candidate -LEGACY/updateCandidate.dto';

export default interface IEditProfileUseCase {
  execute(updateCandidateDto: UpdateCandidateDTO): Promise<CandidateDTO | null>;
}
