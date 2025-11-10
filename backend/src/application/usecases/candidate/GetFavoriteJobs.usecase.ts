import { inject, injectable } from 'tsyringe';
import FavoriteJobsAggregated from '../../../domain/entities/user/favoriteJobsAggregated.entity';
import IFavoriteJobsRepo from '../../../domain/interfaces/candidate/IFavoriteJobRepo';
import FavoriteJobsAggregatedDTO from '../../DTOs/candidate -LEGACY/favoriteJobAggregated.dto';
import IGetFavoriteJobUseCase from '../../interfaces/usecases/user/IGetFavoriteJobs.usecase';


@injectable()
export default class GetFavoriteJobUseCase implements IGetFavoriteJobUseCase {
  constructor(@inject('') private _iFavoriteJobsRepo: IFavoriteJobsRepo) {}

  async execute(
    candidateId: string
  ): Promise<FavoriteJobsAggregatedDTO[] | null> {
    const result = await this._iFavoriteJobsRepo.getFavoriteJobWithDetails(
      candidateId
    );
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
