import { MyJobDTO } from './loadJob.dto';

export default interface PaginatedJobsDTO {
  jobs: MyJobDTO[];
  totalPages: number;
  limit: number;
  page: number;
}
