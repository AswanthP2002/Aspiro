import { SkillDTO } from '../../../presentation/controllers/dtos/candidate/skillsDTO';
import Skills from '../../entities/user/skills.entity';

export default function createSkillsFromSkillDTO(dto: SkillDTO): Skills {
  return {
    ...dto,
  };
}
