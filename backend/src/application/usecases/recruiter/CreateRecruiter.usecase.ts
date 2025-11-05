import IRecruiterRepo from '../../../domain/interfaces/recruiter/IRecruiterRepo';
import CreateRecruiterDTO, { RecruiterDTO } from '../../DTOs/recruiter/recruiter.dto';
import mapToRecruiterFromCreateRecruiterDTO from '../../mappers/recruiter/mapToRecruiterFromCreateRecruiterDto.mapper';
import mapToRecruiterDtoFromRecruiter from '../../mappers/recruiter/mapToRecruiterDtoFromRecruiter.mapper';
import { injectable, inject } from 'tsyringe';
import ICreateRecruiterUsecase from '../../interfaces/usecases/recruiter/ICreateRecruiter.usecase';

@injectable()
export default class CreateRecruiterUsecase implements ICreateRecruiterUsecase {
  constructor(@inject('IRecruiterRepository') private _recruiterRepo: IRecruiterRepo) {}

  async execute(createRecruiterDto: CreateRecruiterDTO): Promise<RecruiterDTO | null> {
    //console.log('Data before mapping from usecase----------', createRecruiterDto)
    const recruiter = mapToRecruiterFromCreateRecruiterDTO(createRecruiterDto);
    //console.log('Data after mapping from usecase-----------', recruiter)
    //console.log('Checking flow')
    //throw new Error('Checking flow')
    const result = await this._recruiterRepo.create(recruiter);

    if (result) {
      const recruiterDto = mapToRecruiterDtoFromRecruiter(result);
      return recruiterDto;
    }

    return null;
  }
}
