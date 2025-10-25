import { inject, injectable } from 'tsyringe';
import IExperienceRepo from '../../../domain/interfaces/candidate/IExperienceRepo';
import IDeleteUserExperienceUsecase from '../../interfaces/usecases/user/IDeleteUserExperience.usecase';

@injectable()
export default class DeleteUserExperienceUsecase implements IDeleteUserExperienceUsecase {
  constructor(@inject('IExperienceRepository') private _experienceRepo: IExperienceRepo) {}

  async execute(experienceId: string): Promise<void> {
    await this._experienceRepo.delete(experienceId);
  }
}
