import Experience from '../../../domain/entities/user/experience.entity';
import IExperienceRepo from '../../../domain/interfaces/user/IExperienceRepo';
import { ExperienceDto } from '../../DTOs/user/experience.dto.FIX';
import IGetUserExperiencesUsecase from '../../interfaces/usecases/user/IGetUserExperiences.usecase.FIX';
import { inject, injectable } from 'tsyringe';
import { plainToInstance } from 'class-transformer';

@injectable()
export default class GetUserExperiencesUsecase implements IGetUserExperiencesUsecase {
  constructor(@inject('IExperienceRepository') private _experienceRepo: IExperienceRepo) {}

  async execute(userId: string): Promise<ExperienceDto[] | null> {
    const result = await this._experienceRepo.findWihUserId(userId);
    if (result) {
      const experienceDto: ExperienceDto[] = [];
      result.forEach((experience: Experience) => {
        experienceDto.push(plainToInstance(ExperienceDto, experience));
      });
      return experienceDto;
    }
    return null;
  }
}
