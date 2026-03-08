import { inject, injectable } from 'tsyringe';
import IRecruiterRepo from '../../../domain/interfaces/recruiter/IRecruiterRepo';
import IDeleteRecruiterUsecase from './interfaces/ICloseCompany.usecase';
import { RecruiterDTO } from '../../DTOs/recruiter/recruiter.dto.FIX';
import RecruiterMapper from '../../mappers/recruiter/Recruiter.mapperClass';

@injectable()
export default class DeleteRecruiterUsecaase implements IDeleteRecruiterUsecase {
  private _mapper: RecruiterMapper;
  constructor(@inject('IRecruiterRepository') private _recruiterRepo: IRecruiterRepo) {
    this._mapper = new RecruiterMapper();
  }

  async execute(id: string): Promise<RecruiterDTO | null> {
    //const deleteResult = await this._recruiterRepo.update(id, { isDeleted: true });
    // if (deleteResult) {
    //   // return this._mapper.recruiterToRecruiterDTO(deleteResult);
    // }
    return null;
  }
}
