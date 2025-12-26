import PaginatedJobsDTO from '../../../DTOs/recruiter/paginattedJobsDTO.dto';

export default interface ILoadRecruiterRecentJobs {
  execute(recruiterId: string): Promise<PaginatedJobsDTO | null>;
}
