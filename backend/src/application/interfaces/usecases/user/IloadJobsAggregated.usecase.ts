import { LoadJobResDTO } from '../../../DTOs/loadJob.dto';
import LoadJobsAggregatedQueryDTO from '../../../DTOs/user/loadJobsAggregatedQuery.dto';

export default interface ILoadJobsAggregatedUsecase {
  execute(loadJobQueryDto: LoadJobsAggregatedQueryDTO): Promise<LoadJobResDTO | null>;
}
