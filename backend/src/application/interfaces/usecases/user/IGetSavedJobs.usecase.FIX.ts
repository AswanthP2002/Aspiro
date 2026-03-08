import { LoadSavedJobsRequestDTO, MySavedJobsDTO } from '../../../DTOs/job/loadSavedJobs.dto';

export default interface IGetSavedJobsUsecase {
  execute(
    dto: LoadSavedJobsRequestDTO
  ): Promise<{ jobs: MySavedJobsDTO[]; totalPages: number } | null>;
}
