import { SkillDTO } from '../../../DTOs/skill/skill.dto.FIX';

export default interface IGetUserSkillsUsecase {
  execute(userId?: string): Promise<SkillDTO[] | null>;
}
