import { SkillDTO } from '../../../DTOs/candidate/skill.dto';

export default interface ILoadSkillsUseCase {
  execute(candidateId?: string): Promise<SkillDTO[] | null>;
}
