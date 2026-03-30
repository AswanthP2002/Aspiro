import SkillsDTO, { UpdateSkillsDTO } from '../../../DTOs/skills.admin/skills.dto';

export default interface IAdminUpdateSkillUsecase {
  execute(dto: UpdateSkillsDTO): Promise<SkillsDTO | null>;
}
