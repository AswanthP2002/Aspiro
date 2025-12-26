import Education from '../../../domain/entities/user/educations.entity';
import IEducationRepo from '../../../domain/interfaces/user/IEducationRepo';
import { EducationDTO } from '../../DTOs/user/education.dto.FIX';
import IGetUserEducationsUsecase from '../../interfaces/usecases/user/IGetUserEducations.usecase.FIX';
import { inject, injectable } from 'tsyringe';
import { plainToInstance } from 'class-transformer';

@injectable()
export default class GetUserEducationsUsecase implements IGetUserEducationsUsecase {
  constructor(@inject('IEducationRepository') private _educationRepo: IEducationRepo) {}

  async execute(userId: string): Promise<EducationDTO[] | null> {
    const result = await this._educationRepo.findWithUserId(userId);

    if (result) {
      const dto: EducationDTO[] = [];
      result.forEach((education: Education) => {
        dto.push(plainToInstance(EducationDTO, education));
      });
      return dto;
    }
    return null;
  }
}
