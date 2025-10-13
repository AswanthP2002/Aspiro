import IRecruiterRepo from '../../../domain/interfaces/recruiter/IRecruiterRepo';
import IRegisterRecruiterUseCase from './interface/IRegisterRecruiter.usecase';
import CreateRecruiterDTO, {
  RecruiterDTO,
} from '../../DTOs/recruiter/recruiter.dto';
import mapToRecruiterFromCreateRecruiterDTO from '../../mappers/recruiter/mapToRecruiterFromCreateRecruiterDto.mapper';
import mapToRecruiterDtoFromRecruiter from '../../mappers/recruiter/mapToRecruiterDtoFromRecruiter.mapper';
import { injectable, inject } from 'tsyringe';

@injectable()
export default class RegisterRecruiterUseCase
  implements IRegisterRecruiterUseCase
{
  constructor(
    @inject('IRecruiterRepository') private _recruiterRepo: IRecruiterRepo
  ) {}

  async execute(
    createRecruiterDto: CreateRecruiterDTO
  ): Promise<RecruiterDTO | null> {
    const recruiter = mapToRecruiterFromCreateRecruiterDTO(createRecruiterDto);

    const result = await this._recruiterRepo.create(recruiter);

    if (result) {
      const recruiterDto = mapToRecruiterDtoFromRecruiter(result);
      return recruiterDto;
    }

    return null;
  }
}