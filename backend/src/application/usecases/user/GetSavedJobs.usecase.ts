import { inject, injectable } from 'tsyringe';
import FavoriteJobsAggregated from '../../../domain/entities/user/favoriteJobsAggregated.entity';
import IFavoriteJobsRepo from '../../../domain/interfaces/user/IFavoriteJobRepo';
import FavoriteJobsAggregatedDTO from '../../DTOs/candidate -LEGACY/favoriteJobAggregated.dto';
import IGetFavoriteJobUseCase from '../../interfaces/usecases/user/IGetSavedJobs.usecase';
import IGetSavedJobsUsecase from '../../interfaces/usecases/user/IGetSavedJobs.usecase';


@injectable()
export default class GetSavedJobsUsecase implements IGetSavedJobsUsecase {
  constructor(@inject('IFavoriteJobRepository') private _iFavoriteJobsRepo: IFavoriteJobsRepo) {}

  async execute(candidateId: string): Promise<FavoriteJobsAggregatedDTO[] | null> {
    const result = await this._iFavoriteJobsRepo.getFavoriteJobWithDetails(candidateId);
    if (result) {
      const dto: FavoriteJobsAggregatedDTO[] = [];
      result.forEach((favoriteJobAgg: FavoriteJobsAggregated) => {
        dto.push(favoriteJobAgg);
      });

      return dto;
    }
    return null;
  }
}
