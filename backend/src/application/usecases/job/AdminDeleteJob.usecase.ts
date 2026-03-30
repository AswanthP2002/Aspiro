import { inject, injectable } from 'tsyringe';
import IAdminDeleteJobUsecase from '../../interfaces/usecases/job/IAdminDeleteJob.usecase';
import IJobRepo from '../../../domain/interfaces/IJobRepo';

@injectable()
export default class AdminDeleteJobUsecase implements IAdminDeleteJobUsecase {
  constructor(@inject('IJobRepository') private _repo: IJobRepo) {}

  async execute(id: string): Promise<void> {
    await this._repo.delete(id);
  }
}
