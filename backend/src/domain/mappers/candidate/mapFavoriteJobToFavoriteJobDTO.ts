import FavoriteJobDTO from '../../../application/DTOs/candidate/favoriteJob.dto';
import FavoriteJobs from '../../entities/candidate/favoriteJobs.entity';

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
