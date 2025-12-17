import CandidateDTO from '../../../DTOs/candidate -LEGACY/candidate.dto';
import CreateCandidateDTO from '../../../DTOs/candidate -LEGACY/createCandidate.dto';

export default interface IRegisterCandidateUseCase {
  execute(createCandidateDto: CreateCandidateDTO): Promise<CandidateDTO | null>;
}
