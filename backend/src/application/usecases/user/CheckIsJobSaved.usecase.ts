import { inject, injectable } from 'tsyringe';
import FavoriteJobs from '../../../domain/entities/user/favoriteJobs.entity';
import IFavoriteJobsRepo from '../../../domain/interfaces/user/IFavoriteJobRepo';
import ICheckIsJobSavedUseCase from '../../interfaces/usecases/user/ICheckIsJobSaved.usecase';


@injectable()
export default class CheckIsJobSavedUseCase implements ICheckIsJobSavedUseCase {
  constructor(
    @inject('IFavoriteJobRepository') private _favoritejobRepo: IFavoriteJobsRepo
  ) {}

  async execute(jobId: string, candidateid: string): Promise<boolean | null> {
    const favoriteJobs = await this._favoritejobRepo.findWithCandidateId(candidateid);

    if (favoriteJobs) {
      const jobFound =
        favoriteJobs.find((job: FavoriteJobs) => {
          if (job.jobId?.toString().includes(jobId.toString())) {
            return job;
          }
        }) || {};

      return Object.entries(jobFound).length > 0;
    }

    return null;
  }
}
