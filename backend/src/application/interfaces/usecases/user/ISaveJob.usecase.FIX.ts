import AddJobFavoriteDTO from '../../../DTOs/user/addJobFavorite.dto.FIX';
import FavoriteJobDTO from '../../../DTOs/user/favoriteJob.dto.FIX';

export default interface ISaveJobUsecase {
  execute(addJobFavoriteDto: AddJobFavoriteDTO): Promise<FavoriteJobDTO | null>;
}
