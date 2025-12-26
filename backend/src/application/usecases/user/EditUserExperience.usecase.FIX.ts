import IExperienceRepo from '../../../domain/interfaces/user/IExperienceRepo';
import { ExperienceDto, UpdateExperienceDto } from '../../DTOs/user/experience.dto.FIX';
import IEditUserExperienceUsecase from '../../interfaces/usecases/user/IEditUserExperience.usecase.FIX';
import { inject, injectable } from 'tsyringe';
import { ExperienceMapper } from '../../mappers/user/Experience.mapperClass';
import { plainToInstance } from 'class-transformer';

@injectable()
export default class EditUserExperienceUsecase implements IEditUserExperienceUsecase {
  private _mapper: ExperienceMapper;
  constructor(@inject('IExperienceRepository') private _experienceRepo: IExperienceRepo) {
    this._mapper = new ExperienceMapper();
  }

  async execute(editExperienceDto: UpdateExperienceDto): Promise<ExperienceDto | null> {
    const { _id } = editExperienceDto;
    const editData = this._mapper.updateExperienceDtoToExperience(editExperienceDto);
    const result = await this._experienceRepo.update(_id, editData);
    if (result) {
      const dto = plainToInstance(ExperienceDto, result);

      return dto;
    }
    return null;
  }
}
