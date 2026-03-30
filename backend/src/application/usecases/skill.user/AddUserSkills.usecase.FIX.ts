import ISkillRepo from '../../../domain/interfaces/user/ISkillRepo';
import { CreateSkillDTO, SkillDTO } from '../../DTOs/skill/skill.dto.FIX';
import { inject, injectable } from 'tsyringe';
import IAddUsersSkillUsecase from '../../interfaces/usecases/skill.user/IAddUsersSkill.usecase.FIX';
import { SkillsMapper } from '../../mappers/skill.user/Skill.mapperClass';

@injectable()
export default class AddUsersSkillsUsecase implements IAddUsersSkillUsecase {
  constructor(
    @inject('ISkillRepository') private _skillRepo: ISkillRepo,
    @inject('SkillMapper') private _mapper: SkillsMapper
  ) {}

  async execute(createSkillDto: CreateSkillDTO): Promise<SkillDTO | null> {
    const newSkill = this._mapper.createSkillsDtoToSkill(createSkillDto);
    const result = await this._skillRepo.create(newSkill);
    if (result) {
      const dto = this._mapper.skillToSkillDTO(result);
      return dto;
    }

    return null;
  }
}
