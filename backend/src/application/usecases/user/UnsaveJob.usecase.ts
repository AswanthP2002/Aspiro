import { inject, injectable } from 'tsyringe';
import IFavoriteJobsRepo from '../../../domain/interfaces/user/IFavoriteJobRepo';
import IUnsaveJobUseCase from '../../interfaces/usecases/user/IUnsaveJob.usecase';

@injectable()
export default class UnsaveJobUseCase implements IUnsaveJobUseCase {
  constructor(
    @inject('IFavoriteJobRepository') private _iFavoriteJobRepo: IFavoriteJobsRepo
  ) {}

  async execute(jobId: string, candidateId: string): Promise<void> {
    await this._iFavoriteJobRepo.deleteFavoriteJob(jobId, candidateId);
  }
}
