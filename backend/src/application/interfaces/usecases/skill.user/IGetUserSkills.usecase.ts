import { SkillDTO } from '../../../DTOs/skill/skill.dto';

export default interface IGetUserSkillsUsecase {
  execute(userId?: string): Promise<SkillDTO[] | null>;
}
