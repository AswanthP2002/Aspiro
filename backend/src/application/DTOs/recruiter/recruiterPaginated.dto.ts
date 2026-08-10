import { AdminRecruiterListDTO } from './recruiterProfileOverviewData.dto';

export default interface RecruiterPaginatedDTO {
  recruiters: AdminRecruiterListDTO[];
  page: number;
  totalPages: number;
  currentSort?: string;
}
