import Skills from '../../../domain/entities/user/skills.entity';
import { SkillDTO } from '../../DTOs/user/skill.dto';

export default function mapToSkillDTOFromSkills(skill: Skills): SkillDTO {
  return {
    _id: skill._id,
    skill: skill.skill,
    skillLevel: skill.skillLevel,
    skillType: skill.skillType,
    userId: skill.userId,
  };
}
