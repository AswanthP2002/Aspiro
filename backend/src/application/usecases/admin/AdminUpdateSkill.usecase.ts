import { inject, injectable } from 'tsyringe';
import IAdminUpdateSkillUsecase from '../../interfaces/usecases/admin/IAdminUpdateSkill.usecase';
import ISkillSetsRepo from '../../../domain/interfaces/ISkillSetsRepo';
import SkillsDTO, { UpdateSkillsDTO } from '../../DTOs/admin/skills.dto';
import AdminSkillSetMapper from '../../mappers/admin/skillset.mapperClass';

@injectable()
export default class AdminUpdateSkillUsecase implements IAdminUpdateSkillUsecase {
  private _mapper: AdminSkillSetMapper;
  constructor(@inject('ISkillSetsRepository') private _repo: ISkillSetsRepo) {
    this._mapper = new AdminSkillSetMapper();
  }

  async execute(dto: UpdateSkillsDTO): Promise<SkillsDTO | null> {
    const updatedSkill = await this._repo.update(dto._id, {
      isVerified: dto.isVerified,
      skills: dto.skills,
    });

    if (updatedSkill) {
      return this._mapper.skillsetToSkillSetDTO(updatedSkill);
    }

    return null;
  }
}
