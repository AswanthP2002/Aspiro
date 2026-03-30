import SkillSet from '../../../domain/entities/skill.admin/skills.entity';
import SkillsDTO from '../../DTOs/skills.admin/skills.dto';

export default class AdminSkillSetMapper {
  public skillsetToSkillSetDTO(skillSet: SkillSet): SkillsDTO {
    return {
      _id: skillSet._id,
      isVerified: skillSet.isVerified,
      skills: skillSet.skills,
    };
  }
}
