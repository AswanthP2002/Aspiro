import FavoriteJobsAggregated from '../../../domain/entities/candidate/favoriteJobsAggregated.entity';
import FavoriteJobsAggregatedDTO from '../../DTOs/candidate/favoriteJobAggregated.dto';

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
