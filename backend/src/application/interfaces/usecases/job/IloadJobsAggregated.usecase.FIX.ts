import { JobListForPublicDTO, LoadJobListForPublicDTO } from '../../../DTOs/job/loadJob.dto.FIX';

export default interface ILoadJobsAggregatedUsecase {
  execute(
    dto: LoadJobListForPublicDTO
  ): Promise<{ jobs: JobListForPublicDTO[]; totalPages: number } | null>;
}
