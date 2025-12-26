import { RecruiterDTO } from '../../../DTOs/recruiter/recruiter.dto.FIX';

export default interface IBlockRecruiterUsecase {
  execute(id: string): Promise<RecruiterDTO | null>;
}
