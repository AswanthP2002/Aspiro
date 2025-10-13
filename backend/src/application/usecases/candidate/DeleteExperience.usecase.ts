import IExperienceRepo from '../../../domain/interfaces/candidate/IExperienceRepo';
import IDeleteExperienceUseCase from './interface/IDeleteExperience.usecase';

export default class DeleteExperienceUseCase
  implements IDeleteExperienceUseCase
{
  constructor(private _experienceRepo: IExperienceRepo) {}

  async execute(experienceId: string): Promise<void> {
    await this._experienceRepo.delete(experienceId);
  }
}
