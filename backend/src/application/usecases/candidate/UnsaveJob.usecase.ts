import IFavoriteJobsRepo from '../../../domain/interfaces/candidate/IFavoriteJobRepo';
import IUnsaveJobUseCase from './interface/IUnsaveJob.usecase';

export default class UnsaveJobUseCase implements IUnsaveJobUseCase {
  constructor(private _iFavoriteJobRepo: IFavoriteJobsRepo) {}

  async execute(jobId: string, candidateId: string): Promise<void> {
    await this._iFavoriteJobRepo.deleteFavoriteJob(jobId, candidateId);
  }
}
