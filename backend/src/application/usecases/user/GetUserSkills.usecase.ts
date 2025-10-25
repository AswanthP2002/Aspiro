import Skills from '../../../domain/entities/user/skills.entity';
import ISkillRepo from '../../../domain/interfaces/candidate/ISkillRepo';
import { SkillDTO } from '../../DTOs/user/skill.dto';
import mapToSkillDTOFromSkills from '../../mappers/user/mapToSkillsFromSkillDTO.mapper';
import IGetUserSkillsUsecase from '../../interfaces/usecases/user/IGetUserSkills.usecase';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class GetUserSkillsUsecase implements IGetUserSkillsUsecase {
  constructor(@inject('ISkillRepository') private _skillRepo : ISkillRepo) {}

  async execute(userId: string): Promise<SkillDTO[] | null> {
   const result = await this._skillRepo.findWithUserId(userId.toString())
    if (result) {
      const dto: SkillDTO[] = [];
      result.forEach((skill: Skills) => {
        dto.push(mapToSkillDTOFromSkills(skill));
      });
      return dto;
    }
    return null;
  }
}
