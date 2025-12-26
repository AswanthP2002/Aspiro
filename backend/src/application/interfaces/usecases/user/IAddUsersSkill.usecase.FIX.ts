import { CreateSkillDTO, SkillDTO } from '../../../DTOs/user/skill.dto.FIX';

export default interface IAddUsersSkillUsecase {
  execute(createSkillDto: CreateSkillDTO): Promise<SkillDTO | null>;
}
