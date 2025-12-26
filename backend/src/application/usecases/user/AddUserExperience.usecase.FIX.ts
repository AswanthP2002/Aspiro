import IExperienceRepo from '../../../domain/interfaces/user/IExperienceRepo';
import { CreateExperienceDto, ExperienceDto } from '../../DTOs/user/experience.dto.FIX';
import { inject, injectable } from 'tsyringe';
import IAddUserExperienceUsecase from '../../interfaces/usecases/user/IAddUserExperience.usecase.FIX';
import { ExperienceMapper } from '../../mappers/user/Experience.mapperClass';
import { plainToInstance } from 'class-transformer';

@injectable()
export default class AddUserExperienceUsecase implements IAddUserExperienceUsecase {
  private _mapper: ExperienceMapper;
  constructor(@inject('IExperienceRepository') private _experienceRepo: IExperienceRepo) {
    this._mapper = new ExperienceMapper();
  }

  async execute(createExperienceDto: CreateExperienceDto): Promise<ExperienceDto | null> {
    const newExperience = this._mapper.dtoToExperience(createExperienceDto);

    const result = await this._experienceRepo.create(newExperience);
    if (result) {
      const dto = plainToInstance(ExperienceDto, result);
      return dto;
    }

    return null;
  }
}
