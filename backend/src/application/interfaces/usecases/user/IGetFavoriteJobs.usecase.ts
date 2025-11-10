import FavoriteJobsAggregatedDTO from "../../../DTOs/candidate -LEGACY/favoriteJobAggregated.dto";

export default interface IGetFavoriteJobUseCase {
    execute(candidateId : string) : Promise<FavoriteJobsAggregatedDTO[] | null>
}