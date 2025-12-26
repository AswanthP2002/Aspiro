import IEducationRepo from '../../../domain/interfaces/user/IEducationRepo';
import { CreateEducationDTO, EducationDTO } from '../../DTOs/user/education.dto.FIX';
import IAddUserEducationUsecase from '../../interfaces/usecases/user/IAddUserEducation.usecase.FIX';
import { inject, injectable } from 'tsyringe';
import EducationMapper from '../../mappers/user/Education.mapperClass';
import { plainToInstance } from 'class-transformer';

@injectable()
export default class AddUserEducationUsecase implements IAddUserEducationUsecase {
  private _mapper: EducationMapper;
  constructor(@inject('IEducationRepository') private _educationRepo: IEducationRepo) {
    this._mapper = new EducationMapper();
  }

  async execute(createEducationDto: CreateEducationDTO): Promise<EducationDTO | null> {
    const newEducation = this._mapper.createEducationDtoToEducation(createEducationDto);
    const result = await this._educationRepo.create(newEducation);
    if (result) {
      const dto = plainToInstance(EducationDTO, result);
      return dto;
    }

    return null;
  }
}
