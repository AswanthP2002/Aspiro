import PaginatedJobsDTO from '../../../DTOs/job/paginattedJobsDTO.dto';

export default interface ILoadRecruiterRecentJobs {
  execute(recruiterId: string): Promise<PaginatedJobsDTO | null>;
}
