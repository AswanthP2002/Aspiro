import AddJobFavoriteDTO from '../../../DTOs/user/addJobFavorite.dto';
import FavoriteJobDTO from '../../../DTOs/user/favoriteJob.dto';

export default interface ISaveJobUsecase {
  execute(addJobFavoriteDto: AddJobFavoriteDTO): Promise<FavoriteJobDTO | null>;
}
