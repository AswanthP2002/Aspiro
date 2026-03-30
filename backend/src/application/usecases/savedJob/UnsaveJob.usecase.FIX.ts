import { inject, injectable } from 'tsyringe';
import IFavoriteJobsRepo from '../../../domain/interfaces/user/IFavoriteJobRepo';
import IUnsaveJobUseCase from '../../interfaces/usecases/savedJobs/IUnsaveJob.usecase.FIX';

@injectable()
export default class UnsaveJobUseCase implements IUnsaveJobUseCase {
  constructor(@inject('IFavoriteJobRepository') private _iFavoriteJobRepo: IFavoriteJobsRepo) {}

  async execute(id: string): Promise<void> {
    await this._iFavoriteJobRepo.delete(id);
  }
}
