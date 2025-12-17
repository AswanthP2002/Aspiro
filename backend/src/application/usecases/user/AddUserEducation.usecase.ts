import IEducationRepo from '../../../domain/interfaces/user/IEducationRepo';
import { CreateEducationDTO, EducationDTO } from '../../DTOs/user/education.dto';
import mapToEducationFromCreateEducationDTO from '../../mappers/user/mapToEducationFromCreateEducation.mapper';
import mapToEducationDTOFromEducation from '../../mappers/user/mapToEducationDTOFromEducation.mapper';
import IAddUserEducationUsecase from '../../interfaces/usecases/user/IAddUserEducation.usecase';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class AddUserEducationUsecase implements IAddUserEducationUsecase {
  constructor(@inject('IEducationRepository') private _educationRepo: IEducationRepo) {}

  async execute(createEducationDto: CreateEducationDTO): Promise<EducationDTO | null> {
    const newEducation = mapToEducationFromCreateEducationDTO(createEducationDto);
    const result = await this._educationRepo.create(newEducation)
    if (result) {
      const dto = mapToEducationDTOFromEducation(result);
      return dto;
    }

    return null;
  }
}
