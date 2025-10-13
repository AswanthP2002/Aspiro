import IRecruiterRepo from '../../../domain/interfaces/recruiter/IRecruiterRepo';
import { RecruiterDTO } from '../../DTOs/recruiter/recruiter.dto';
import VerifyRecruiterDTO from '../../DTOs/recruiter/verifyRecruiter.dto';
import mapToRecruiterDtoFromRecruiter from '../../mappers/recruiter/mapToRecruiterDtoFromRecruiter.mapper';
import IVerifyRecruiterUseCase from './interface/IVerifyRecruiter.usecase';

export default class VerifyRecruiterUseCase implements IVerifyRecruiterUseCase {
  constructor(private recruiterRepo: IRecruiterRepo) {}

  async execute(
    verifyRecruiterDto: VerifyRecruiterDTO
  ): Promise<RecruiterDTO | null> {
    // const recruiter = await this.recruiterRepo.findByEmail(verifyRecruiterDto.email)

    // if(!recruiter || !recruiter.otpExpiresAt) throw new Error('Invalid')

    // if(recruiter.otpExpiresAt < new Date()) throw new Error('Expired')

    // if(recruiter.verificationToken !== verifyRecruiterDto.opt) throw new Error('Wrong')

    // const recruiterVerified = await this.recruiterRepo.verifyRecruiter(verifyRecruiterDto.email)
    // if(recruiterVerified){
    //     const dto = mapToRecruiterDtoFromRecruiter(recruiterVerified)
    //     return dto
    // }
    return null;
  }
}
