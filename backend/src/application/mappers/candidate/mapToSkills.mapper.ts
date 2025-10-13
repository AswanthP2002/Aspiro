import Skills from '../../../domain/entities/candidate/skills.entity';
import { CreateSkillDTO } from '../../DTOs/candidate/skill.dto';

export default function mapToSkills(createSkillDto: CreateSkillDTO): Skills {
  return {
    level: createSkillDto.level,
    type: createSkillDto.type,
    skill: createSkillDto.skill,
    candidateId: createSkillDto.candidateId,
  };
}
