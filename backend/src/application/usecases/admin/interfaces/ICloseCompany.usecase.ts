import { RecruiterDTO } from '../../../DTOs/recruiter/recruiter.dto';

export default interface IDeleteRecruiterUsecase {
  execute(id: string): Promise<RecruiterDTO | null>;
}
