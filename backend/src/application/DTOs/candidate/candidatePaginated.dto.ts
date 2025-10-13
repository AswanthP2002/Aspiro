import Candidate from '../../../domain/entities/candidate/candidate.entity';

export default interface CandidatePaginatedDTO {
  candidates: Candidate[];
  currentPage: number;
  totalPages: number;
  currentSort: string;
}
