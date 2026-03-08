import { MyJobDTO } from '../job/loadJob.dto.FIX';

export default interface PaginatedJobsDTO {
  jobs: MyJobDTO[];
  totalPages: number;
  limit: number;
  page: number;
}
