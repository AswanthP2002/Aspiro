import SkillsDTO, { UpdateSkillsDTO } from '../../../DTOs/admin/skills.dto';

export default interface IAdminUpdateSkillUsecase {
  execute(dto: UpdateSkillsDTO): Promise<SkillsDTO | null>;
}
