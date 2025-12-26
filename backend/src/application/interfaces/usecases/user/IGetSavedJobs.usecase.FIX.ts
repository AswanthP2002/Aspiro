import FavoriteJobsAggregatedDTO from '../../../DTOs/candidate -LEGACY/favoriteJobAggregated.dto.FIX';

export default interface IGetSavedJobsUsecase {
  execute(candidateId: string): Promise<FavoriteJobsAggregatedDTO[] | null>;
}
