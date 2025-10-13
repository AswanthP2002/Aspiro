import CandidatePaginated from '../../../domain/entities/candidate/candidatePaginated.entity';
import CandidatePaginatedDTO from '../../DTOs/candidate/candidatePaginated.dto';

export default function mapToCandidatePaginagedDTO(
  candidatePaginated: CandidatePaginated
): CandidatePaginatedDTO {
  return {
    candidates: candidatePaginated.candidates,
    currentPage: candidatePaginated.currentPage,
    currentSort: candidatePaginated.currentSort,
    totalPages: candidatePaginated.totalPages,
  };
}
