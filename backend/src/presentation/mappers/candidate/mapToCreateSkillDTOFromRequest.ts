import { CreateSkillDTO } from '../../../application/DTOs/candidate/skill.dto';
import AddSkillRequestDTO from '../../DTOs/candidate/addSkillReuestDTO';

export default function mapToCreateSkillDTOFromRequest(
  requestDto: AddSkillRequestDTO
): CreateSkillDTO {
  return {
    skill: requestDto.skill,
    level: requestDto.level,
    type: requestDto.type,
    candidateId: requestDto.candidateId,
  };
}
