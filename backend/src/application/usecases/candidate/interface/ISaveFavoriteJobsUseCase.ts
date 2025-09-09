import FavoriteJobs from "../../../../domain/entities/candidate/favoriteJobs";
import AddJobFavoriteDTO from "../../../DTOs/candidate/addJobFavoriteDTO";

export default interface ISaveFavoriteJobUseCase {
    execute(addJobFavoriteDto : AddJobFavoriteDTO) : Promise<FavoriteJobs | null>
}