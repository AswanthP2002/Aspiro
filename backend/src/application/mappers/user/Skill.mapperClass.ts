import Skills from '../../../domain/entities/user/skills.entity';
import { CreateSkillDTO } from '../../DTOs/user/skill.dto.FIX';

export class SkillsMapper {
  public createSkillsDtoToSkill(dto: CreateSkillDTO): Skills {
    return {
      skill: dto.skill,
      skillLevel: dto.skillLevel,
      skillType: dto.skillType,
      userId: dto.userId,
    };
  }
}
