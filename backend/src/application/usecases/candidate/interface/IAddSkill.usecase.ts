import Skills from '../../../../domain/entities/candidate/skills.entity';
import { CreateSkillDTO, SkillDTO } from '../../../DTOs/candidate/skill.dto';

export default interface IAddSkillsUseCase {
  execute(createSkillDto: CreateSkillDTO): Promise<SkillDTO | null>;
}
