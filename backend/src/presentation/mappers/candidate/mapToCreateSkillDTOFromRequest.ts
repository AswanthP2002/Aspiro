import { CreateSkillDTO } from '../../../application/DTOs/user/skill.dto.FIX';
import AddSkillRequestDTO from '../../DTOs/candidate/addSkillReuestDTO';

export default function mapToCreateSkillDTOFromRequest(
  requestDto: AddSkillRequestDTO
): CreateSkillDTO {
  return {
    skill: requestDto.skill,
    skillLevel: requestDto.skillLevel,
    skillType: requestDto.skillType,
    userId: requestDto.userId,
  };
}
