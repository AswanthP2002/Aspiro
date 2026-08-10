import { JobListForPublicDTO, LoadJobListForPublicDTO } from '../../../DTOs/job/loadJob.dto';

export default interface ILoadJobsAggregatedUsecase {
  execute(
    dto: LoadJobListForPublicDTO
  ): Promise<{ jobs: JobListForPublicDTO[]; totalPages: number } | null>;
}
