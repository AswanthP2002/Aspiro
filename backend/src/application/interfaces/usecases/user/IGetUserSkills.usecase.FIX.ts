import { SkillDTO } from '../../../DTOs/user/skill.dto.FIX';

export default interface IGetUserSkillsUsecase {
  execute(userId?: string): Promise<SkillDTO[] | null>;
}
