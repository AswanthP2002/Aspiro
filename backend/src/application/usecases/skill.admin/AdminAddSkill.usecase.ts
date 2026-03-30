import { injectable, inject } from 'tsyringe';
import IAdminAddSkillUsecase from '../../interfaces/usecases/skill.admin/IAdminAddSkill.usecase';
import ISkillSetsRepo from '../../../domain/interfaces/ISkillSetsRepo';
import SkillsDTO, { CreateSkillDTO } from '../../DTOs/skills.admin/skills.dto';
import AdminSkillSetMapper from '../../mappers/skill.admin/skillset.mapperClass';
import { ResourceAlreadyExistError } from '../../../domain/errors/AppError';

@injectable()
export default class AdminAddSkillsUsecase implements IAdminAddSkillUsecase {
  constructor(
    @inject('ISkillSetsRepository') private _repo: ISkillSetsRepo,
    @inject('AdminSkillMapper') private _mapper: AdminSkillSetMapper
  ) {}

  async execute(dto: CreateSkillDTO): Promise<SkillsDTO | null> {
    const existing = await this._repo.findSkillWithName(dto.skills.toLowerCase());
    if (existing) {
      throw new ResourceAlreadyExistError('Skill');
    }
    const newSkill = await this._repo.create({ skills: dto.skills });

    if (newSkill) {
      return this._mapper.skillsetToSkillSetDTO(newSkill);
    }

    return null;
  }
}
