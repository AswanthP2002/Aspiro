import { RecruiterDTO } from '../../../DTOs/recruiter/recruiter.dto.FIX';

export default interface IDeleteRecruiterUsecase {
  execute(id: string): Promise<RecruiterDTO | null>;
}
