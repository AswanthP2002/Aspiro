import AddJobFavoriteDTO from '../../../DTOs/candidate -LEGACY/addJobFavorite.dto';
import FavoriteJobDTO from '../../../DTOs/candidate -LEGACY/favoriteJob.dto';

export default interface ISaveJobUsecase {
  execute(addJobFavoriteDto: AddJobFavoriteDTO): Promise<FavoriteJobDTO | null>;
}
