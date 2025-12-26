import { LoadJobsResDto } from '../../../DTOs/job/loadJob.dto.FIX';
import { LoadJobsAggregatedQueryDto } from '../../../DTOs/job/loadJobsAggregatedQuery.dto.FIX';

export default interface ILoadJobsAggregatedUsecase {
  execute(loadJobQueryDto: LoadJobsAggregatedQueryDto): Promise<LoadJobsResDto | null>;
}
