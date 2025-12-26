import { inject, injectable } from 'tsyringe';
import IAdminDeleteSkillUsecase from '../../interfaces/usecases/admin/IAdminDeleteSkill.usecase';
import ISkillSetsRepo from '../../../domain/interfaces/ISkillSetsRepo';

@injectable()
export default class AdminDeleteSkillsUsecase implements IAdminDeleteSkillUsecase {
  constructor(@inject('ISkillSetsRepository') private _repo: ISkillSetsRepo) {}

  async execute(id: string): Promise<void> {
    await this._repo.delete(id);
  }
}
