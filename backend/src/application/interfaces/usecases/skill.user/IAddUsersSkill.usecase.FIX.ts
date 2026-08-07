import { CreateSkillDTO, SkillDTO } from '../../../DTOs/skill/skill.dto';

export default interface IAddUsersSkillUsecase {
  execute(createSkillDto: CreateSkillDTO): Promise<SkillDTO | null>;
}
