import { RecruiterDTO } from '../../../DTOs/recruiter/recruiter.dto.FIX';

export default interface IAdminChangeRecruiterApplicationStatusToUnderReview {
  execute(applicationId: string): Promise<RecruiterDTO | null>;
}
