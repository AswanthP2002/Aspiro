import Experience from '../../../domain/entities/user/experience.entity';
import IExperienceRepo from '../../../domain/interfaces/user/IExperienceRepo';
import { ExperienceDTO } from '../../DTOs/user/experience.dto.FIX';
import IGetUserExperiencesUsecase from '../../interfaces/usecases/user/IGetUserExperiences.usecase.FIX';
import { inject, injectable } from 'tsyringe';
import { ExperienceMapper } from '../../mappers/user/Experience.mapperClass';

@injectable()
export default class GetUserExperiencesUsecase implements IGetUserExperiencesUsecase {
  constructor(
    @inject('IExperienceRepository') private _experienceRepo: IExperienceRepo,
    @inject('ExperienceMapper') private _mapper: ExperienceMapper
  ) {}

  async execute(userId: string): Promise<ExperienceDTO[] | null> {
    const result = await this._experienceRepo.findWihUserId(userId);
    if (result) {
      const experienceDto: ExperienceDTO[] = [];
      result.forEach((experience: Experience) => {
        experienceDto.push(this._mapper.experienceToExperienceDTO(experience));
      });
      return experienceDto;
    }
    return null;
  }
}
