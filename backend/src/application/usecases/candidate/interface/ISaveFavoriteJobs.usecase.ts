import AddJobFavoriteDTO from '../../../DTOs/candidate -LEGACY/addJobFavorite.dto';
import FavoriteJobDTO from '../../../DTOs/candidate -LEGACY/favoriteJob.dto';

export default interface ISaveFavoriteJobUseCase {
  execute(addJobFavoriteDto: AddJobFavoriteDTO): Promise<FavoriteJobDTO | null>;
}
