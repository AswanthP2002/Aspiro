import IExperienceRepo from '../../../domain/interfaces/candidate/IExperienceRepo';

import {
  EditExperienceDTO,
  ExperienceDTO,
} from '../../DTOs/candidate/experience.dto';
import mapToEditExperienceFromDTO from '../../mappers/candidate/mapToEditExperienceFromDTO.mapper';

import mapToExperienceDTO from '../../mappers/candidate/mapToExperienceDTO.mapper';
import IEditExperienceUseCase from './interface/IEditExperience.usecase';

export default class EditExperienceUseCase implements IEditExperienceUseCase {
  constructor(private _experienceRepo: IExperienceRepo) {}

  async execute(
    editExperienceDto: EditExperienceDTO
  ): Promise<ExperienceDTO | null> {
    const { experienceId } = editExperienceDto;
    const editData = mapToEditExperienceFromDTO(editExperienceDto);
    // const editData = {...editExperienceDto}
    console.log('experience id from the usecase', experienceId);
    console.log('editable data', editData);
    const result = await this._experienceRepo.update(experienceId, editData);
    if (result) {
      const dto = mapToExperienceDTO(result);
      console.log('Data edited, returinging dto');
      return dto;
    }
    console.log('Data not edited, returning null anyway');
    return null;
  }
}
