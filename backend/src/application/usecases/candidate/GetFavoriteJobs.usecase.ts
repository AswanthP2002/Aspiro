import FavoriteJobsAggregated from '../../../domain/entities/candidate/favoriteJobsAggregated.entity';
import IFavoriteJobsRepo from '../../../domain/interfaces/candidate/IFavoriteJobRepo';
import FavoriteJobsAggregatedDTO from '../../DTOs/candidate/favoriteJobAggregated.dto';
import IGetFavoriteJobUseCase from './interface/IGetFavoriteJobs.usecase';

export default class GetFavoriteJobUseCase implements IGetFavoriteJobUseCase {
  constructor(private _iFavoriteJobsRepo: IFavoriteJobsRepo) {}

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
