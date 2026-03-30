import LoadRecruiterJobsDTO from '../../../DTOs/job/loadRecruiterJobs.dto';
import PaginatedJobsDTO from '../../../DTOs/job/paginattedJobsDTO.dto';

export default interface ILoadRecruiterJobsUsecase {
  execute(loadRecruiterJobsDto: LoadRecruiterJobsDTO): Promise<PaginatedJobsDTO | null>;
}
