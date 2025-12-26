import SkillsDTO, { CreateSkillDTO } from '../../../DTOs/admin/skills.dto';

export default interface IAdminAddSkillUsecase {
  execute(dto: CreateSkillDTO): Promise<SkillsDTO | null>;
}
