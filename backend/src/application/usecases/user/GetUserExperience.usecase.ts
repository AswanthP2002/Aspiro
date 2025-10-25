import Experience from '../../../domain/entities/user/experience.entity';
import IExperienceRepo from '../../../domain/interfaces/candidate/IExperienceRepo';
import { ExperienceDTO } from '../../DTOs/user/experience.dto';
import mapToExperienceDTO from '../../mappers/user/mapToExperienceDTO.mapper';
import IGetUserExperiencesUsecase from '../../interfaces/usecases/user/IGetUserExperiences.usecase';
import { inject, injectable } from 'tsyringe';


@injectable()
export default class GetUserExperiencesUsecase implements IGetUserExperiencesUsecase {
  constructor(@inject('IExperienceRepository') private _experienceRepo : IExperienceRepo) {}

  async execute(userId: string): Promise<ExperienceDTO[] | null> {
    const result = await this._experienceRepo.findWihUserId(userId)
    if (result) {
      const experienceDto: ExperienceDTO[] = [];
      result.forEach((experience: Experience) => {
        experienceDto.push(mapToExperienceDTO(experience));
      });
      return experienceDto;
    }
    return null;
  }
}
