import Candidate from './candidate.entity';

export default interface CandidatePaginated {
  candidates: Candidate[];
  currentPage: number;
  totalPages: number;
  currentSort: string;
}
