import { RecruiterDTO } from '../../../DTOs/recruiter/recruiter.dto.FIX';

export default interface IApproveRecruiterApplicationUsecase {
  execute(id: string): Promise<RecruiterDTO | null>;
}
