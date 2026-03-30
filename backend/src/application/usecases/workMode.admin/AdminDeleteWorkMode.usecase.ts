import { inject, injectable } from 'tsyringe';
import IAdminDeleteWorkModeUsecase from '../../interfaces/usecases/workMode.admin/IAdminDeleteWorkMode.usecase';
import IWorkModeRepository from '../../../domain/interfaces/admin/IWorkMode.repo';

@injectable()
export default class AdminDeleteWorkModeUsecase implements IAdminDeleteWorkModeUsecase {
  constructor(@inject('IWorkModeRepository') private _repo: IWorkModeRepository) {}

  async execute(id: string): Promise<void> {
    await this._repo.delete(id);
  }
}
