import { AdminRecruiterDetailsDTO } from '../../../DTOs/recruiter/recruiterProfileOverviewData.dto.FIX';

export default interface IAdminLoadRecruiterDetailsUsecase {
  execute(recruiterId: string): Promise<AdminRecruiterDetailsDTO | null>;
}
