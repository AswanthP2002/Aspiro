import { inject, injectable } from 'tsyringe';
import IAdminUpdateSkillUsecase from '../../interfaces/usecases/admin/IAdminUpdateSkill.usecase';
import ISkillSetsRepo from '../../../domain/interfaces/ISkillSetsRepo';
import SkillsDTO, { UpdateSkillsDTO } from '../../DTOs/admin/skills.dto';
import { plainToInstance } from 'class-transformer';

@injectable()
export default class AdminUpdateSkillUsecase implements IAdminUpdateSkillUsecase {
  constructor(@inject('ISkillSetsRepository') private _repo: ISkillSetsRepo) {}

  async execute(dto: UpdateSkillsDTO): Promise<SkillsDTO | null> {
    const updatedSkill = await this._repo.update(dto._id, {
      isVerified: dto.isVerified,
      skills: dto.skills,
    });

    if (updatedSkill) {
      return plainToInstance(SkillsDTO, updatedSkill);
    }

    return null;
  }
}
