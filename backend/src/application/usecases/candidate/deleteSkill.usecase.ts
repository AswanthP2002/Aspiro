import ISkillRepo from '../../../domain/interfaces/candidate/ISkillRepo';
import IDeleteSkillsUseCase from './interface/IDeleteSkills.usecase';

export default class DeleteSkillUseCase implements IDeleteSkillsUseCase {
  constructor(private _skillRepo: ISkillRepo) {}

  async execute(id: string): Promise<void> {
    await this._skillRepo.delete(id);
  }
}
