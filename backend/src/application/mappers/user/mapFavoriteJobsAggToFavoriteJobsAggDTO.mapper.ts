import FavoriteJobsAggregated from '../../../domain/entities/user/favoriteJobsAggregated.entity';
import FavoriteJobsAggregatedDTO from '../../DTOs/candidate -LEGACY/favoriteJobAggregated.dto.FIX';

export default function mapFavoriteJobsAggregatedToFavoriteJobsAggDTO(
  favoriteJobsAgg: FavoriteJobsAggregated
): FavoriteJobsAggregatedDTO {
  return {
    _id: favoriteJobsAgg._id,
    candidateId: favoriteJobsAgg.candidateId,
    jobDetails: favoriteJobsAgg.jobDetails,
    createdAt: favoriteJobsAgg.createdAt,
    jobId: favoriteJobsAgg.jobId,
  };
}
