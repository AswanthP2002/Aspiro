import Skills from '../../../domain/entities/user/skills.entity';
import ISkillRepo from '../../../domain/interfaces/user/ISkillRepo';
import { SkillDTO } from '../../DTOs/user/skill.dto.FIX';
import IGetUserSkillsUsecase from '../../interfaces/usecases/user/IGetUserSkills.usecase.FIX';
import { inject, injectable } from 'tsyringe';
import { plainToInstance } from 'class-transformer';

@injectable()
export default class GetUserSkillsUsecase implements IGetUserSkillsUsecase {
  constructor(@inject('ISkillRepository') private _skillRepo: ISkillRepo) {}

  async execute(userId: string): Promise<SkillDTO[] | null> {
    const result = await this._skillRepo.findWithUserId(userId.toString());
    if (result) {
      const dto: SkillDTO[] = [];
      result.forEach((skill: Skills) => {
        dto.push(plainToInstance(SkillDTO, skill));
      });
      return dto;
    }
    return null;
  }
}
