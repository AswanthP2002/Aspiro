import JobLevel from '../../entities/jobLevel/jobLevel.entity';
import IBaseRepo from '../IBaseRepo';

export default interface IJobLevelRepository extends IBaseRepo<JobLevel> {
  getAggregatedJobLevel(
    search: string,
    limit: number,
    page: number
  ): Promise<{ jobLevels: JobLevel[]; totalPages: number } | null>;
  findJobLevelWithSlugName(slug: string): Promise<JobLevel | null>;
}
