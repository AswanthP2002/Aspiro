import { inject, injectable } from 'tsyringe';
import IFavoriteJobsRepo from '../../../domain/interfaces/user/IFavoriteJobRepo';
import IGetSavedJobsUsecase from '../../interfaces/usecases/user/IGetSavedJobs.usecase.FIX';
import { LoadSavedJobsRequestDTO, MySavedJobsDTO } from '../../DTOs/job/loadSavedJobs.dto';
import SavedJobsMapper from '../../mappers/job/SavedJob.mapperClass';

@injectable()
export default class GetSavedJobsUsecase implements IGetSavedJobsUsecase {
  constructor(
    @inject('IFavoriteJobRepository') private _iFavoriteJobsRepo: IFavoriteJobsRepo,
    @inject('SavedJobsMapper') private _mapper: SavedJobsMapper
  ) {}

  async execute(
    dto: LoadSavedJobsRequestDTO
  ): Promise<{ jobs: MySavedJobsDTO[]; totalPages: number } | null> {
    const { candidateId, search, limit, page, sort } = dto;
    const result = await this._iFavoriteJobsRepo.getFavoriteJobWithDetails(
      candidateId,
      search,
      page,
      limit,
      sort
    );

    if (result) {
      const dto: MySavedJobsDTO[] = [];
      result.jobs.forEach((data) =>
        dto.push(this._mapper.favoriteJobAggregatedToMySavedJobsDTO(data))
      );

      return { jobs: dto, totalPages: result.totalPages };
    }

    return null;
  }
}
