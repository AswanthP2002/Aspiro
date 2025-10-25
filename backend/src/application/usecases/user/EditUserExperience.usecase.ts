import IExperienceRepo from '../../../domain/interfaces/candidate/IExperienceRepo';
import { EditExperienceDTO, ExperienceDTO } from '../../DTOs/user/experience.dto';
import mapToEditExperienceFromDTO from '../../mappers/user/mapToEditExperienceFromDTO.mapper';
import mapToExperienceDTO from '../../mappers/user/mapToExperienceDTO.mapper';
import IEditUserExperienceUsecase from '../../interfaces/usecases/user/IEditUserExperience.usecase';
import { inject, injectable } from 'tsyringe';


@injectable()
export default class EditUserExperienceUsecase implements IEditUserExperienceUsecase {
  constructor(@inject('IExperienceRepository') private _experienceRepo: IExperienceRepo) {}

  async execute(editExperienceDto: EditExperienceDTO): Promise<ExperienceDTO | null> {
    const { experienceId } = editExperienceDto;
    const editData = mapToEditExperienceFromDTO(editExperienceDto);
    const result = await this._experienceRepo.update(experienceId, editData);
    if (result) {
      const dto = mapToExperienceDTO(result);
      
      return dto;
    }
    return null;
  }
}
