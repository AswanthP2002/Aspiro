import { inject, injectable } from 'tsyringe';
import IAdminGetSkillsUsecase from '../../interfaces/usecases/admin/IAdminGetSkills.usecase';
import ISkillSetsRepo from '../../../domain/interfaces/ISkillSetsRepo';
import SkillsDTO, { GetSkillsDTO, LoadPaginatedSkillsDTO } from '../../DTOs/admin/skills.dto';
import SkillSet from '../../../domain/entities/skills.entity';
import { plainToInstance } from 'class-transformer';
import SkillsLoadQuery from '../../queries/skills.query';

@injectable()
export default class AdminGetSkillsUsecase implements IAdminGetSkillsUsecase {
  constructor(@inject('ISkillSetsRepository') private _repo: ISkillSetsRepo) {}

  async execute(dto: GetSkillsDTO): Promise<LoadPaginatedSkillsDTO | null> {
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
        dto.push(plainToInstance(SkillsDTO, skill));
      });

      return {
        totalPages: skills.totalPages,
        skills: dto,
      };
    }

    return null;
  }
}
