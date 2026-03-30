import CandidateDTO from '../../../DTOs/user/getUsersForPublic.dto';
import CreateCandidateDTO from '../../../DTOs/candidate -LEGACY/createCandidate.dto';

export default interface IRegisterCandidateUseCase {
  execute(createCandidateDto: CreateCandidateDTO): Promise<CandidateDTO | null>;
}
