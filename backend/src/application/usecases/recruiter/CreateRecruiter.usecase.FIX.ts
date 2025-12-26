import IRecruiterRepo from '../../../domain/interfaces/recruiter/IRecruiterRepo';
import CreateRecruiterDTO, { RecruiterDTO } from '../../DTOs/recruiter/recruiter.dto.FIX';
import { injectable, inject } from 'tsyringe';
import ICreateRecruiterUsecase from '../../interfaces/usecases/recruiter/ICreateRecruiter.usecase.FIX';
import RecruiterMapper from '../../mappers/recruiter/Recruiter.mapperClass';
import { plainToInstance } from 'class-transformer';

@injectable()
export default class CreateRecruiterUsecase implements ICreateRecruiterUsecase {
  private _mapper: RecruiterMapper;
  constructor(@inject('IRecruiterRepository') private _recruiterRepo: IRecruiterRepo) {
    this._mapper = new RecruiterMapper();
  }

  async execute(createRecruiterDto: CreateRecruiterDTO): Promise<RecruiterDTO | null> {
    const recruiter = this._mapper.createRecruiterDtoToRecruiter(createRecruiterDto);

    const result = await this._recruiterRepo.create(recruiter);

    if (result) {
      const recruiterDto = plainToInstance(RecruiterDTO, result);
      return recruiterDto;
    }

    return null;
  }
}
