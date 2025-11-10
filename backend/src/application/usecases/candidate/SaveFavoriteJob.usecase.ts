import IFavoriteJobsRepo from '../../../domain/interfaces/candidate/IFavoriteJobRepo';
import ISaveFavoriteJobUseCase from './interface/ISaveFavoriteJobs.usecase';
import AddJobFavoriteDTO from '../../DTOs/candidate -LEGACY/addJobFavorite.dto';
import FavoriteJobDTO from '../../DTOs/candidate -LEGACY/favoriteJob.dto';
import mapFavoriteJobToFavoriteJobDTO from '../../../domain/mappers/candidate/mapFavoriteJobToFavoriteJobDTO';

export default class SaveFavoriteJobUseCase implements ISaveFavoriteJobUseCase {
  constructor(private _IFavoriteJobRepo: IFavoriteJobsRepo) {}

  async execute(
    savefavoriteJobDto: AddJobFavoriteDTO
  ): Promise<FavoriteJobDTO | null> {
    const result = await this._IFavoriteJobRepo.create({
      candidateId: savefavoriteJobDto.candidateId,
      jobId: savefavoriteJobDto.jobId,
    });

    if (result) {
      const dto = mapFavoriteJobToFavoriteJobDTO(result);
      return dto;
    }
    return null;
  }
}
