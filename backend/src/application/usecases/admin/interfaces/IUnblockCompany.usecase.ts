import { RecruiterDTO } from '../../../DTOs/recruiter/recruiter.dto';

export default interface IUnblockRecruiterUsecase {
  execute(id: string): Promise<RecruiterDTO | null>;
}
