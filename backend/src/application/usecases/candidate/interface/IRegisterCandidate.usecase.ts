import CandidateDTO from '../../../DTOs/candidate/candidate.dto';
import CreateCandidateDTO from '../../../DTOs/candidate/createCandidate.dto';

export default interface IRegisterCandidateUseCase {
  execute(createCandidateDto: CreateCandidateDTO): Promise<CandidateDTO | null>;
}
