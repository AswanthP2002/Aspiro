import Skills from '../../../domain/entities/skill.user/skills.entity';
import { CreateSkillDTO, SkillDTO } from '../../DTOs/skill/skill.dto.FIX';

export class SkillsMapper {
  public createSkillsDtoToSkill(dto: CreateSkillDTO): Skills {
    return {
      skill: dto.skill as string,
      skillLevel: dto.skillLevel as string,
      skillType: dto.skillType as string,
      userId: dto.userId,
    };
  }

  public skillToSkillDTO(skill: Skills): SkillDTO {
    return {
      _id: skill._id,
      skill: skill.skill,
      skillLevel: skill.skillLevel,
      skillType: skill.skillType,
    };
  }
}
