import { inject, injectable } from 'tsyringe';
import IRecruiterRepo from '../../../domain/interfaces/recruiter/IRecruiterRepo';
import {
  RecruiterDTO,
  UpdateRecriterDTO,
} from '../../DTOs/recruiter/recruiter.dto.FIX';
import SaveIntroDetailsDTO from '../../DTOs/recruiter/saveIntroDetails.dto';
import mapToRecruiterDtoFromRecruiter from '../../mappers/recruiter/mapToRecruiterDtoFromRecruiter.mapper';
import ISaveBasicsUseCase from './interface/ISaveBasicsRecruiter.usecase';
import mapUpdateRecruiterDTOToRecruiterDTO from '../../../presentation/mappers/recruiter/mapUpdateRecruiterDTOToRecruiter.mapper';

@injectable()
export default class SaveBasicsUseCase implements ISaveBasicsUseCase {
  constructor(
    @inject('IRecruiterRepository') private _recruiterRepo: IRecruiterRepo
  ) {}

  async execute(
    updateRecruiterDto: UpdateRecriterDTO
  ): Promise<RecruiterDTO | null> {
    const updatedData = mapUpdateRecruiterDTOToRecruiterDTO(updateRecruiterDto);
    const saveBasics = await this._recruiterRepo.update(
      updateRecruiterDto?._id,
      updatedData
    );

    if (saveBasics) {
      const dto = mapToRecruiterDtoFromRecruiter(saveBasics);
      return dto;
    }

    return null;
  }
}
