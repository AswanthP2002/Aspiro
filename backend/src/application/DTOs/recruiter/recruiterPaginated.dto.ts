import { AdminRecruiterListDTO } from './recruiterProfileOverviewData.dto.FIX';

export default interface RecruiterPaginatedDTO {
  recruiters: AdminRecruiterListDTO[];
  page: number;
  totalPages: number;
  currentSort?: string;
}
