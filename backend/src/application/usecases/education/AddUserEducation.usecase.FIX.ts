import IEducationRepo from '../../../domain/interfaces/user/IEducationRepo';
import { CreateEducationDTO, EducationDTO } from '../../DTOs/education/education.dto.FIX';
import IAddUserEducationUsecase from '../../interfaces/usecases/education/IAddUserEducation.usecase.FIX';
import { inject, injectable } from 'tsyringe';
import EducationMapper from '../../mappers/education/Education.mapperClass';

@injectable()
export default class AddUserEducationUsecase implements IAddUserEducationUsecase {
  constructor(
    @inject('IEducationRepository') private _educationRepo: IEducationRepo,
    @inject('EducationMapper') private _mapper: EducationMapper
  ) {}

  async execute(createEducationDto: CreateEducationDTO): Promise<EducationDTO | null> {
    const newEducation = this._mapper.createEducationDtoToEducation(createEducationDto);
    const result = await this._educationRepo.create(newEducation);
    if (result) {
      const dto = this._mapper.educationToEducationDTO(result);
      return dto;
    }

    return null;
  }
}
