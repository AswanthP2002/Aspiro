import { inject, injectable } from 'tsyringe';
import IAdminDeleteJobTypeUsecase from '../../interfaces/usecases/jobType.admin/IAdminDeleteJobType.usecase';
import IJobTypeRepository from '../../../domain/interfaces/admin/IJobType.repository';

@injectable()
export default class AdminDeleteJobTypeUsecase implements IAdminDeleteJobTypeUsecase {
  constructor(@inject('IJobTypeRepository') private _repo: IJobTypeRepository) {}

  async execute(id: string): Promise<void> {
    await this._repo.delete(id);
  }
}
