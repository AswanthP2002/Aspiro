import { RecruiterDTO } from '../../../DTOs/recruiter/recruiter.dto';

export default interface IAdminChangeRecruiterApplicationStatusToUnderReview {
  execute(applicationId: string): Promise<RecruiterDTO | null>;
}
