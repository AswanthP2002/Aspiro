import { RecruiterDTO } from '../../../DTOs/recruiter/recruiter.dto';

export default interface IBlockRecruiterUsecase {
  execute(id: string): Promise<RecruiterDTO | null>;
}
