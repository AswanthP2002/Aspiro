import FavoriteJobsAggregatedDTO from "../../../DTOs/candidate/favoriteJobAggregated.dto";

export default interface IGetFavoriteJobUseCase {
    execute(candidateId : string) : Promise<FavoriteJobsAggregatedDTO[] | null>
}