import FavoriteJobsAggregatedDTO from "../../../DTOs/candidate -LEGACY/favoriteJobAggregated.dto";

export default interface IGetSavedJobsUsecase {
    execute(candidateId : string) : Promise<FavoriteJobsAggregatedDTO[] | null>
}