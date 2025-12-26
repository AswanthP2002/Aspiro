import FavoriteJobDTO from '../../../application/DTOs/user/favoriteJob.dto.FIX';
import FavoriteJobs from '../../entities/user/favoriteJobs.entity';

export default function mapFavoriteJobToFavoriteJobDTO(
  favoriteJob: FavoriteJobs
): FavoriteJobDTO {
  return {
    _id: favoriteJob._id,
    candidateId: favoriteJob.candidateId,
    jobId: favoriteJob.jobId,
    createdAt: favoriteJob.createdAt,
  };
}
