import { GetSkillsDTO, LoadPaginatedSkillsDTO } from '../../../DTOs/skills.admin/skills.dto';

export default interface IAdminGetSkillsUsecase {
  execute(getSkillDto: GetSkillsDTO): Promise<LoadPaginatedSkillsDTO | null>;
}
