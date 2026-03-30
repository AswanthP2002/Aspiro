import { MyJobDTO } from './loadJob.dto.FIX';

export default interface PaginatedJobsDTO {
  jobs: MyJobDTO[];
  totalPages: number;
  limit: number;
  page: number;
}
