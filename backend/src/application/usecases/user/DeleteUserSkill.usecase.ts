import { inject, injectable } from 'tsyringe';
import ISkillRepo from '../../../domain/interfaces/candidate/ISkillRepo';
import IDeleteUserSkillUsecase from '../../interfaces/usecases/user/IDeleteUserSkill.usecase';


@injectable()
export default class DeleteUserSkillUsecase implements IDeleteUserSkillUsecase {
  constructor(@inject('ISkillRepository') private _skillRepo: ISkillRepo) {}

  async execute(skillId: string): Promise<void> {
    await this._skillRepo.delete(skillId);
  }
}
