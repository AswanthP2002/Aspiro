import ISkillRepo from '../../../domain/interfaces/user/ISkillRepo';
import { CreateSkillDTO, SkillDTO } from '../../DTOs/user/skill.dto';
import mapToSkills from '../../mappers/user/mapToSkills.mapper';
import mapToSkillDTOFromSkills from '../../mappers/user/mapToSkillsFromSkillDTO.mapper';
import { inject, injectable } from 'tsyringe';
import IAddUsersSkillUsecase from '../../interfaces/usecases/user/IAddUsersSkill.usecase';

@injectable()
export default class AddUsersSkillsUsecase implements IAddUsersSkillUsecase {
  constructor(@inject('ISkillRepository') private _skillRepo : ISkillRepo) {}

  async execute(createSkillDto: CreateSkillDTO): Promise<SkillDTO | null> {
    const newSkill = mapToSkills(createSkillDto);
    const result = await this._skillRepo.create(newSkill);
    if (result) {
      const dto = mapToSkillDTOFromSkills(result);
      return dto;
    }

    return null;
  }
}
