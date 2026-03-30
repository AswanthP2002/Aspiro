import JobType from '../../entities/jobType/jobType.entity';
import IBaseRepo from '../IBaseRepo';

export default interface IJobTypeRepository extends IBaseRepo<JobType> {
  findJobTypeWithSlugName(slug: string): Promise<JobType | null>;
  getPaginatedJobTypes(
    limit: number,
    page: number
  ): Promise<{ jobTypes: JobType[]; totalPages: number }>;
}
