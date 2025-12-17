import FavoriteJobs from '../../entities/user/favoriteJobs.entity';
import FavoriteJobsAggregated from '../../entities/user/favoriteJobsAggregated.entity';

import IBaseRepo from '../IBaseRepo';

export default interface IFavoriteJobsRepo extends IBaseRepo<FavoriteJobs> {
  getFavoriteJobWithDetails(
    candidateId: string
  ): Promise<FavoriteJobsAggregated[] | null>;
  deleteFavoriteJob(jobId: string, candidateId: string): Promise<void>;
  findWithCandidateId(id: string): Promise<FavoriteJobs[] | null>;
}
