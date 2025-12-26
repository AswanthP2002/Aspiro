import { inject, injectable } from 'tsyringe';
import IExperienceRepo from '../../../domain/interfaces/user/IExperienceRepo';
import IDeleteUserExperienceUsecase from '../../interfaces/usecases/user/IDeleteUserExperience.usecase.FIX';

@injectable()
export default class DeleteUserExperienceUsecase implements IDeleteUserExperienceUsecase {
  constructor(@inject('IExperienceRepository') private _experienceRepo: IExperienceRepo) {}

  async execute(experienceId: string): Promise<void> {
    await this._experienceRepo.delete(experienceId);
  }
}
