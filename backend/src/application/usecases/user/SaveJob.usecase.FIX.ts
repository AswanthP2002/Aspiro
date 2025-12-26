import IFavoriteJobsRepo from '../../../domain/interfaces/user/IFavoriteJobRepo';
import AddJobFavoriteDTO from '../../DTOs/user/addJobFavorite.dto.FIX';
import FavoriteJobDTO from '../../DTOs/user/favoriteJob.dto.FIX';
import { inject, injectable } from 'tsyringe';
import ISaveJobUsecase from '../../interfaces/usecases/user/ISaveJob.usecase.FIX';
import { plainToInstance } from 'class-transformer';

@injectable()
export default class SaveJobUsecase implements ISaveJobUsecase {
  constructor(@inject('IFavoriteJobRepository') private _IFavoriteJobRepo: IFavoriteJobsRepo) {}

  async execute(savefavoriteJobDto: AddJobFavoriteDTO): Promise<FavoriteJobDTO | null> {
    const result = await this._IFavoriteJobRepo.create({
      candidateId: savefavoriteJobDto.candidateId,
      jobId: savefavoriteJobDto.jobId,
    });

    if (result) {
      const dto = plainToInstance(FavoriteJobDTO, result);
      return dto;
    }
    return null;
  }
}
