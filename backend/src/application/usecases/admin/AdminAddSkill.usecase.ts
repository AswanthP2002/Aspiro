import { injectable, inject } from 'tsyringe';
import IAdminAddSkillUsecase from '../../interfaces/usecases/admin/IAdminAddSkill.usecase';
import ISkillSetsRepo from '../../../domain/interfaces/ISkillSetsRepo';
import SkillsDTO, { CreateSkillDTO } from '../../DTOs/admin/skills.dto';
import { plainToInstance } from 'class-transformer';

@injectable()
export default class AdminAddSkillsUsecase implements IAdminAddSkillUsecase {
  constructor(@inject('ISkillSetsRepository') private _repo: ISkillSetsRepo) {}

  async execute(dto: CreateSkillDTO): Promise<SkillsDTO | null> {
    const newSkill = await this._repo.create({ skills: dto.skills });

    if (newSkill) {
      return plainToInstance(SkillsDTO, newSkill);
    }

    return null;
  }
}
