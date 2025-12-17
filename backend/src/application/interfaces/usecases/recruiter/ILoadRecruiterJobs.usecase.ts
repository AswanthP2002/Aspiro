import LoadRecruiterJobsDTO from '../../../DTOs/recruiter/loadRecruiterJobs.dto';
import PaginatedJobsDTO from '../../../DTOs/recruiter/paginattedJobsDTO.dto';

export default interface ILoadRecruiterJobsUsecase {
  execute(loadRecruiterJobsDto: LoadRecruiterJobsDTO): Promise<PaginatedJobsDTO | null>;
}
