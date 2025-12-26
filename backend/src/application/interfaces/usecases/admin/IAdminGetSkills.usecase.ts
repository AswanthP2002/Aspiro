import SkillsDTO, { GetSkillsDTO, LoadPaginatedSkillsDTO } from '../../../DTOs/admin/skills.dto';

export default interface IAdminGetSkillsUsecase {
  execute(getSkillDto: GetSkillsDTO): Promise<LoadPaginatedSkillsDTO | null>;
}
