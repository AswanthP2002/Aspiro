import { inject, injectable } from 'tsyringe';
import IAdminDeleteJobLevelUsecase from '../../interfaces/usecases/jobLevel.admin/IAdminDeleteJobLevel.usecase';
import IJobLevelRepository from '../../../domain/interfaces/admin/IJobLevel.repository';

@injectable()
export default class AdminDeleteJobLevelUsecase implements IAdminDeleteJobLevelUsecase {
  constructor(@inject('IJobLevelRepository') private _repo: IJobLevelRepository) {}

  async execute(id: string): Promise<void> {
    await this._repo.delete(id);
  }
}
