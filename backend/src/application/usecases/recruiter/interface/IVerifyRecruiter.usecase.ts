import { RecruiterDTO } from '../../../DTOs/recruiter/recruiter.dto.FIX';
import VerifyRecruiterDTO from '../../../DTOs/recruiter/verifyRecruiter.dto';

export default interface IVerifyRecruiterUseCase {
  execute(verifyRecruiterDto: VerifyRecruiterDTO): Promise<RecruiterDTO | null>;
}
