import { FindCandidatesDTO } from '../../DTOs/candidate -LEGACY/candidate.dto';
import CandidatePaginatedDTO from '../../DTOs/candidate -LEGACY/candidatePaginated.dto';

export default interface IGetCandidatesUseCase {
  execute(
    getCandidatesDto: FindCandidatesDTO
  ): Promise<CandidatePaginatedDTO | null>;
}
