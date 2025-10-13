import { FindCandidatesDTO } from '../../DTOs/candidate/candidate.dto';
import CandidatePaginatedDTO from '../../DTOs/candidate/candidatePaginated.dto';

export default interface IGetCandidatesUseCase {
  execute(
    getCandidatesDto: FindCandidatesDTO
  ): Promise<CandidatePaginatedDTO | null>;
}
