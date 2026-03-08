import { injectable, inject } from 'tsyringe';
import IAdminAddSkillUsecase from '../../interfaces/usecases/admin/IAdminAddSkill.usecase';
import ISkillSetsRepo from '../../../domain/interfaces/ISkillSetsRepo';
import SkillsDTO, { CreateSkillDTO } from '../../DTOs/admin/skills.dto';
import AdminSkillSetMapper from '../../mappers/admin/skillset.mapperClass';

@injectable()
export default class AdminAddSkillsUsecase implements IAdminAddSkillUsecase {
  private _mapper: AdminSkillSetMapper;
  constructor(@inject('ISkillSetsRepository') private _repo: ISkillSetsRepo) {
    this._mapper = new AdminSkillSetMapper();
  }

  async execute(dto: CreateSkillDTO): Promise<SkillsDTO | null> {
    const newSkill = await this._repo.create({ skills: dto.skills });

    if (newSkill) {
      return this._mapper.skillsetToSkillSetDTO(newSkill);
    }

    return null;
  }
}
