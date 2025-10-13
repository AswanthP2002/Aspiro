import IEducationRepo from '../../../domain/interfaces/candidate/IEducationRepo';
import IAddEducationUseCase from './interface/IAddEducation.usecase';
import {
  CreateEducationDTO,
  EducationDTO,
} from '../../DTOs/candidate/education.dto';
import mapToEducationFromCreateEducationDTO from '../../mappers/candidate/mapToEducationFromCreateEducation.mapper';
import mapToEducationDTOFromEducation from '../../mappers/candidate/mapToEducationDTOFromEducation.mapper';

export default class AddEducationUseCase implements IAddEducationUseCase {
  constructor(private _iEducationRepo: IEducationRepo) {}

  async execute(
    createEducationDto: CreateEducationDTO
  ): Promise<EducationDTO | null> {
    const newEducation =
      mapToEducationFromCreateEducationDTO(createEducationDto);
    const result = await this._iEducationRepo.create(newEducation);
    if (result) {
      const dto = mapToEducationDTOFromEducation(result);
      return dto;
    }

    return null;
  }
}
