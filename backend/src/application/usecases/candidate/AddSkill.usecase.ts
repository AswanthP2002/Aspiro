import ISkillRepo from '../../../domain/interfaces/candidate/ISkillRepo';
import IAddSkillsUseCase from './interface/IAddSkill.usecase';
import { CreateSkillDTO, SkillDTO } from '../../DTOs/candidate/skill.dto';
import mapToSkills from '../../mappers/candidate/mapToSkills.mapper';
import mapToSkillDTOFromSkills from '../../mappers/candidate/mapToSkillsFromSkillDTO.mapper';

export default class AddSkill implements IAddSkillsUseCase {
  constructor(private _skillRepo: ISkillRepo) {}

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
