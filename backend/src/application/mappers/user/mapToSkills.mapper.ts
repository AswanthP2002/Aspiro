import Skills from '../../../domain/entities/user/skills.entity';
import { CreateSkillDTO } from '../../DTOs/user/skill.dto.FIX';

export default function mapToSkills(createSkillDto: CreateSkillDTO): Skills {
  return {
    skillLevel: createSkillDto.skillLevel,
    skillType: createSkillDto.skillType,
    skill: createSkillDto.skill,
    userId: createSkillDto.userId,
  };
}
