import Candidate from '../../../domain/entities/user/candidate.entity';

export default interface CandidatePaginatedDTO {
  candidates: Candidate[];
  currentPage: number;
  totalPages: number;
  currentSort: string;
}
