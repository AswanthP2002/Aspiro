import AddJobFavoriteDTO from '../../../DTOs/candidate/addJobFavorite.dto';
import FavoriteJobDTO from '../../../DTOs/candidate/favoriteJob.dto';

export default interface ISaveFavoriteJobUseCase {
  execute(addJobFavoriteDto: AddJobFavoriteDTO): Promise<FavoriteJobDTO | null>;
}
