import { inject, injectable } from 'tsyringe';
import IRecruiterRepo from '../../../domain/interfaces/recruiter/IRecruiterRepo';
import { RecruiterDTO } from '../../DTOs/recruiter/recruiter.dto.FIX';
import IBlockRecruiterUsecase from '../../interfaces/usecases/recruiter/IBlockRecruiter.usecase';
// import RecruiterMapper from '../../mappers/recruiter/Recruiter.mapperClass';

@injectable()
export default class BlockRecruiterUsecase implements IBlockRecruiterUsecase {
  //private _mapper: RecruiterMapper;
  constructor(@inject('IRecruiterRepository') private _recruiterRepo: IRecruiterRepo) {
    //this._mapper = new RecruiterMapper();
  }

  async execute(id: string): Promise<RecruiterDTO | null> {
    console.log(id, this._recruiterRepo);
    // const result = await this._recruiterRepo.update(id, { isSuspended: true });
    // if (result) {
    //   const dto = await this._mapper.recruiterToRecruiterDTO(result);
    //   return dto;
    // }
    return null;
  }
}
