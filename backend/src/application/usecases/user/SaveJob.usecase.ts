import IFavoriteJobsRepo from '../../../domain/interfaces/user/IFavoriteJobRepo';
import AddJobFavoriteDTO from '../../DTOs/candidate -LEGACY/addJobFavorite.dto';
import FavoriteJobDTO from '../../DTOs/candidate -LEGACY/favoriteJob.dto';
import mapFavoriteJobToFavoriteJobDTO from '../../../domain/mappers/candidate/mapFavoriteJobToFavoriteJobDTO';
import { inject, injectable } from 'tsyringe';
import ISaveJobUsecase from '../../interfaces/usecases/user/ISaveJob.usecase';

@injectable()
export default class SaveJobUsecase implements ISaveJobUsecase {
  constructor(
    @inject('IFavoriteJobRepository') private _IFavoriteJobRepo: IFavoriteJobsRepo) {}

  async execute(savefavoriteJobDto: AddJobFavoriteDTO): Promise<FavoriteJobDTO | null> {
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
