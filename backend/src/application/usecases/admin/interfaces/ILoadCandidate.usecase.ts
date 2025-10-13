import LoadCandidateDTO from '../../../DTOs/admin/loadCandidates.dto';
import CandidatePaginatedDTO from '../../../DTOs/candidate/candidatePaginated.dto';

export default interface ILoadCandidateUseCase {
  execute(
    loadCandidateDto: LoadCandidateDTO
  ): Promise<CandidatePaginatedDTO | null>;
}
