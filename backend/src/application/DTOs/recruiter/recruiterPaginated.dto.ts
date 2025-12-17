import { RecruiterDTO } from './recruiter.dto';

export default interface RecruiterPaginatedDTO {
  recruiters: RecruiterDTO[];
  page: number;
  totalPages: number;
  currentSort: {[key: string]:number};
}
