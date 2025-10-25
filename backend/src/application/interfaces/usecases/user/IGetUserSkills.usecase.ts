import { SkillDTO } from '../../../DTOs/user/skill.dto';

export default interface IGetUserSkillsUsecase {
  execute(userId?: string): Promise<SkillDTO[] | null>;
}
