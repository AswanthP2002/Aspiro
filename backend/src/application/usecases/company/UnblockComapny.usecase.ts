import IRecruiterRepo from '../../../domain/interfaces/recruiter/IRecruiterRepo';
import { RecruiterDTO } from '../../DTOs/recruiter/recruiter.dto.FIX';
import { inject, injectable } from 'tsyringe';
import IUnblockRecruiterUsecase from '../admin/interfaces/IUnblockCompany.usecase.FIX';
// import RecruiterMapper from '../../mappers/recruiter/Recruiter.mapperClass';

@injectable()
export default class UnblockRecruiterUsecase implements IUnblockRecruiterUsecase {
  // private _mapper: RecruiterMapper;
  constructor(@inject('IRecruiterRepository') private _recruiterRepo: IRecruiterRepo) {
    // this._mapper = new RecruiterMapper();
  }

  async execute(id: string): Promise<RecruiterDTO | null> {
    console.log(id, this._recruiterRepo);
    // const result = await this._recruiterRepo.update(id, { isSuspended: false });
    // if (result) {
    //   const dto = this._mapper.recruiterToRecruiterDTO(result);
    //   return dto;
    // }
    // return result;
    return null;
  }
}
