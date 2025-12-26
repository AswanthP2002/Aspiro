import ISkillRepo from '../../../domain/interfaces/user/ISkillRepo';
import { CreateSkillDTO, SkillDTO } from '../../DTOs/user/skill.dto.FIX';
import { inject, injectable } from 'tsyringe';
import IAddUsersSkillUsecase from '../../interfaces/usecases/user/IAddUsersSkill.usecase.FIX';
import { SkillsMapper } from '../../mappers/user/Skill.mapperClass';
import { plainToInstance } from 'class-transformer';

@injectable()
export default class AddUsersSkillsUsecase implements IAddUsersSkillUsecase {
  private _mapper: SkillsMapper;
  constructor(@inject('ISkillRepository') private _skillRepo: ISkillRepo) {
    this._mapper = new SkillsMapper();
  }

  async execute(createSkillDto: CreateSkillDTO): Promise<SkillDTO | null> {
    const newSkill = this._mapper.createSkillsDtoToSkill(createSkillDto);
    const result = await this._skillRepo.create(newSkill);
    if (result) {
      const dto = plainToInstance(SkillDTO, result);
      return dto;
    }

    return null;
  }
}
