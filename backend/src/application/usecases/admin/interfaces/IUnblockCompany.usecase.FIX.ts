import { RecruiterDTO } from '../../../DTOs/recruiter/recruiter.dto.FIX';

export default interface IUnblockRecruiterUsecase {
  execute(id: string): Promise<RecruiterDTO | null>;
}
