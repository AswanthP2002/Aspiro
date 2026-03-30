import { inject, injectable } from 'tsyringe';
import IAdminGetSkillsUsecase from '../../interfaces/usecases/skill.admin/IAdminGetSkills.usecase';
import ISkillSetsRepo from '../../../domain/interfaces/ISkillSetsRepo';
import SkillsDTO, {
  GetSkillsDTO,
  LoadPaginatedSkillsDTO,
} from '../../DTOs/skills.admin/skills.dto';
import SkillSet from '../../../domain/entities/skill.admin/skills.entity';
import SkillsLoadQuery from '../../queries/skills/skills.query';
import AdminSkillSetMapper from '../../mappers/skill.admin/skillset.mapperClass';

@injectable()
export default class AdminGetSkillsUsecase implements IAdminGetSkillsUsecase {
  constructor(
    @inject('ISkillSetsRepository') private _repo: ISkillSetsRepo,
    @inject('AdminSkillMapper') private _mapper: AdminSkillSetMapper
  ) {}

  async execute(dto: GetSkillsDTO): Promise<LoadPaginatedSkillsDTO | null> {
    // console.log('-- load skill usecase method trigerred --');
    const { limit, page, search } = dto;
    const qury: SkillsLoadQuery = {
      search: search,
      limit: limit,
      page: page,
    };
    const skills = await this._repo.loadSkillSets(qury);

    if (skills) {
      const dto: SkillsDTO[] = [];
      skills.skills.forEach((skill: SkillSet) => {
        dto.push(this._mapper.skillsetToSkillSetDTO(skill));
      });

      return {
        totalPages: skills.totalPages,
        skills: dto,
      };
    }

    return null;
  }
}
